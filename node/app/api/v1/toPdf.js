const Router = require('koa-router');
const { Auth } = require('../../../middlewares/auth');
const { Resume } = require('../../models/resume');
const { ResumePdf } = require('../../models/resumePdf');
const { Tpl } = require('../../tpl/tpl');
const { PdfCreate } = require('../../tpl/pdfCreate');

const { ToPDFValidator } = require('../../validators/validator');

// 设置路由共有前缀
const router = new Router({
  prefix: '/v1/to_pdf'
});

router.get('/get', new Auth().m, async(ctx)=> {
  const open_id = ctx.auth.uid;
  const pdf = await ResumePdf.getResumePdf(open_id);

  ctx.body = {
    pdf
  }
})
// 获取二维码图片
router.post('/', new Auth().m, async (ctx) => {
  const v = await new ToPDFValidator().validate(ctx);
  const pdf_type = v.get('body.pdf_type');

  const open_id = ctx.auth.uid;
  const tpl = new Tpl(pdf_type);

  const { 
    resumeBase,
    education,
    work,
    project,
    skill,
    certificate } = await Resume.getResumeInfo(open_id);

  // 模板html
  const typeArr = ['education', 'work', 'project', 'skill', 'certificate'];
  let htmlItem = {};
  for (let type of typeArr) {
    const htmlName = type + 'Html';
    htmlItem[htmlName] = tpl.formHtml(eval(type), type);
  }
  
  // pdf 替换规则
  let reg =[];
  for (let t of Object.keys(resumeBase.dataValues)) {
    const item = {
      relus: new RegExp(`__${t}__`,"g"),
      match: resumeBase[t]
    }
    reg.push(item)
  }
  for (let html in htmlItem) {
    const item = {
      relus: new RegExp(`__${html}__`,"g"),
      match: htmlItem[html]
    }
    reg.push(item)
  }
  const pdf_name = open_id + tpl.tplType + '.pdf';
  const pdf_path = global.config.pdfPath + pdf_name;
  await PdfCreate.createPDFProtocolFile(tpl.tplType ,reg, pdf_path);
  const pdf = {
    pdf_path,
    open_id,
    tpl_type: tpl.tplType,
    pdf_link: global.config.pdfLink + pdf_name,
    state: '1'
  }
  const resume_pdf = await ResumePdf.getPdf(open_id, pdf.tpl_type);
  if (resume_pdf) {
    await ResumePdf.updatePdf(resume_pdf.id, pdf);
  } else {
    await ResumePdf.createResumePdf(pdf);
  }

  throw new global.errs.Success();
})


module.exports = router;