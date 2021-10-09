const Router = require('koa-router');
const { emailTo } = require('../../../core/transporterEmali')
const { ResumePdf } = require('../../models/resumePdf');
const { ResumeEmail } = require('../../models/resumeEmail');

// 设置路由共有前缀
const router = new Router({
  prefix: '/v1/email'
});
const { CommonValidator, EmailValidator } = require('../../validators/validator');
// Auth 接口权限校验中间件
const { Auth } = require('../../../middlewares/auth');

const tplList = {
  '模板一': '1',
  '模板二': '2',
  '模板三': '3',
  '模板四': '4',
}
// 发送邮件
router.post('/send', new Auth().m, async (ctx) => {
  const v = await new EmailValidator().validate(ctx);
  const tpl = v.get('body.tpl');
  const tpl_type = tplList[tpl];
  const resume_pdf = await ResumePdf.getPdf(ctx.auth.uid, tpl_type);

  if (!resume_pdf) {
    throw new global.errs.NotFound();
  }
  let mailOptions = {
    from: '',
    to: v.get('body.email'),
    subject: v.get('body.title'), // 标题  
    text: '这是' + v.get('body.title') + '的简历请查收哦！',
    attachments:[  
      {  
        filename : '简历.pdf',  
        path: resume_pdf.pdf_link
      }
    ]  
  };
  const res = await emailTo(mailOptions);

  const email = {
    result_json :JSON.stringify(res),
    open_id: ctx.auth.uid,
    tpl_type,
  }

  await ResumeEmail.createEmailLog(email);

  if (res.httpCode === 500) {
    throw new global.errs.SendError();
  }else {
    throw new global.errs.Success();
  }

})


module.exports = router;