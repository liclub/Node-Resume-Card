const Router = require('koa-router');
const { decode } = require('../../../core/util');

// 设置路由共有前缀
const router = new Router({ prefix: '/v1/resume' });
// Auth 接口权限校验中间件
const { Auth } = require('../../../middlewares/auth');
const { Resume } = require('../../models/resume');
const { ResumeBase } = require('../../models/resumeBase');
const { ResumeEducation } = require('../../models/resumeEducation');
const { ResumeWork } = require('../../models/resumeWork');
const { ResumeProject } = require('../../models/resumeProject');
const { ResumeSkill } = require('../../models/resumeSkill');
const { ResumeCertificate } = require('../../models/resumeCertificate');

const { CommonValidator, IdValidator } = require('../../validators/validator');

// 获取名片信息
router.post('/get', new Auth().m, async (ctx) => {
  const v = await new CommonValidator().validate(ctx);
  let open_id = ctx.auth.uid;
  if (v.get('body.share_id')) {
    if (v.get('body.type') === '2') {
      open_id = v.get('body.share_id')
    }else {
      open_id = decode(v.get('body.share_id'));
    }
  }
  const { resumeBase,
          education,
          work,
          project,
          skill,
          certificate } = await Resume.getResumeInfo(open_id);

  ctx.body = { resumeBase, education, work, project, skill, certificate };
})

// 获取名片夹基本信息
router.get('/base', new Auth().m, async (ctx) => {
  const open_id = ctx.auth.uid;
  let resumeBase = await ResumeBase.getByOpenId(open_id);
  // 获取头像地址
  if (resumeBase && resumeBase.head_src) {
    const base64 = Resume.getHeadBase64(resumeBase.head_src);
    resumeBase.head_src = base64;
  }
  ctx.body = { resumeBase };
})

// 更新基本信息
router.post('/base/update', new Auth().m, async (ctx) => {
  const v = await new CommonValidator().validate(ctx);
  const open_id = ctx.auth.uid;
  const req = v.get('body');
  let base = await ResumeBase.getByOpenId(open_id);
  if (!base) {
    base = await ResumeBase.createBaseInfo(req, open_id);
  }else {
    base = await ResumeBase.updateBaseInfo(req, open_id);
  }
  throw new global.errs.Success();
})

// 获取学历信息列表
router.get('/education', new Auth().m, async (ctx) => {
  let education = await ResumeEducation.getByOpenId(ctx.auth.uid);
  ctx.body = {
    education
  }
})

// 获取某个id学历详情
router.post('/education/id', new Auth().m, async (ctx) => {
  const v = await new IdValidator().validate(ctx);
  let education_edit = await ResumeEducation.getEducationById(ctx.auth.uid,parseInt(v.get('body.id')));
  ctx.body = {
    education_edit
  }
})

// 新增学历信息
router.post('/education/add', new Auth().m, async (ctx) => {
  const v = await new CommonValidator().validate(ctx);
  let education = null;
  if (v.get('body.id')) {
    education = await ResumeEducation.getEducationById(ctx.auth.uid,parseInt(v.get('body.id')));
  }
  if (education) {
    await ResumeEducation.updateResumeEducation(v.get('body'), parseInt(v.get('body.id')), ctx.auth.uid);
  } else {
    await ResumeEducation.addResumeEducation(v.get('body'), ctx.auth.uid);
  }
  throw new global.errs.Success();
})

// 删除学历信息
router.post('/education/delete', new Auth().m, async (ctx) => {
  const v = await new IdValidator().validate(ctx);
  await ResumeEducation.deleteResumeEducation(parseInt(v.get('body.id')), ctx.auth.uid);
  throw new global.errs.Success();
})


// 获取工作经历信息列表
router.get('/work', new Auth().m, async (ctx) => {
  let work = await ResumeWork.getByOpenId(ctx.auth.uid);
  ctx.body = {
    work
  }
})

// 获取某个id工作经历详情
router.post('/work/id', new Auth().m, async (ctx) => {
  const v = await new IdValidator().validate(ctx);
  let work_edit = await ResumeWork.getWorkById(ctx.auth.uid,parseInt(v.get('body.id')));
  ctx.body = {
    work_edit
  }
})

// 新增工作经历信息
router.post('/work/add', new Auth().m, async (ctx) => {
  const v = await new CommonValidator().validate(ctx);
  let work = null;
  if (v.get('body.id')) {
    work = await ResumeWork.getWorkById(ctx.auth.uid,parseInt(v.get('body.id')));
  }
  if (work) {
    await ResumeWork.updateResumeWork(v.get('body'), parseInt(v.get('body.id')), ctx.auth.uid);
  } else {
    await ResumeWork.addResumeWork(v.get('body'), ctx.auth.uid);
  }
  throw new global.errs.Success();
})

// 删除工作经历信息
router.post('/work/delete', new Auth().m, async (ctx) => {
  const v = await new IdValidator().validate(ctx);
  await ResumeWork.deleteResumeWork(parseInt(v.get('body.id')), ctx.auth.uid);
  throw new global.errs.Success();
})



// 获取项目信息列表
router.get('/project', new Auth().m, async (ctx) => {
  let project = await ResumeProject.getByOpenId(ctx.auth.uid);
  ctx.body = {
    project
  }
})

// 获取某个id项目详情
router.post('/project/id', new Auth().m, async (ctx) => {
  const v = await new IdValidator().validate(ctx);
  let project_edit = await ResumeProject.getProjectById(ctx.auth.uid,parseInt(v.get('body.id')));
  ctx.body = {
    project_edit
  }
})

// 新增项目信息
router.post('/project/add', new Auth().m, async (ctx) => {
  const v = await new CommonValidator().validate(ctx);
  let project = null;
  if (v.get('body.id')) {
    project = await ResumeProject.getProjectById(ctx.auth.uid,parseInt(v.get('body.id')));
  }
  if (project) {
    await ResumeProject.updateResumeProject(v.get('body'), parseInt(v.get('body.id')), ctx.auth.uid);
  } else {
    await ResumeProject.addResumeProject(v.get('body'), ctx.auth.uid);
  }
  throw new global.errs.Success();
})

// 删除项目信息
router.post('/project/delete', new Auth().m, async (ctx) => {
  const v = await new IdValidator().validate(ctx);
  await ResumeProject.deleteResumeProject(parseInt(v.get('body.id')), ctx.auth.uid);
  throw new global.errs.Success();
})


// 获取技能列表
router.get('/skill', new Auth().m, async (ctx) => {
  let skill = await ResumeSkill.getByOpenId(ctx.auth.uid);
  ctx.body = {
    skill
  }
})

// 获取某个id技能详情
router.post('/skill/id', new Auth().m, async (ctx) => {
  const v = await new IdValidator().validate(ctx);
  let skill_edit = await ResumeSkill.getSkillById(ctx.auth.uid,parseInt(v.get('body.id')));
  ctx.body = {
    skill_edit
  }
})

// 新增技能
router.post('/skill/add', new Auth().m, async (ctx) => {
  const v = await new CommonValidator().validate(ctx);
  let skill = null;
  if (v.get('body.id')) {
    skill = await ResumeSkill.getSkillById(ctx.auth.uid,parseInt(v.get('body.id')));
  }
  if (skill) {
    await ResumeSkill.updateResumeSkill(v.get('body'), parseInt(v.get('body.id')), ctx.auth.uid);
  } else {
    await ResumeSkill.addResumeSkill(v.get('body'), ctx.auth.uid);
  }
  throw new global.errs.Success();
})

// 删除技能
router.post('/skill/delete', new Auth().m, async (ctx) => {
  const v = await new IdValidator().validate(ctx);
  await ResumeSkill.deleteResumeSkill(parseInt(v.get('body.id')), ctx.auth.uid);
  throw new global.errs.Success();
})



// 获取证书列表
router.get('/certificate', new Auth().m, async (ctx) => {
  let certificate = await ResumeCertificate.getByOpenId(ctx.auth.uid);
  ctx.body = {
    certificate
  }
})

// 获取某个id证书详情
router.post('/certificate/id', new Auth().m, async (ctx) => {
  const v = await new IdValidator().validate(ctx);
  let certificate_edit = await ResumeCertificate.getCertificateById(ctx.auth.uid,parseInt(v.get('body.id')));
  ctx.body = {
    certificate_edit
  }
})

// 新增证书
router.post('/certificate/add', new Auth().m, async (ctx) => {
  const v = await new CommonValidator().validate(ctx);
  let certificate = null;
  if (v.get('body.id')) {
    certificate = await ResumeCertificate.getCertificateById(ctx.auth.uid,parseInt(v.get('body.id')));
  }
  if (certificate) {
    await ResumeCertificate.updateResumeCertificate(v.get('body'), parseInt(v.get('body.id')), ctx.auth.uid);
  } else {
    await ResumeCertificate.addResumeCertificate(v.get('body'), ctx.auth.uid);
  }
  throw new global.errs.Success();
})

// 删除证书
router.post('/certificate/delete', new Auth().m, async (ctx) => {
  const v = await new IdValidator().validate(ctx);
  await ResumeCertificate.deleteResumeCertificate(parseInt(v.get('body.id')), ctx.auth.uid);
  throw new global.errs.Success();
})


module.exports = router