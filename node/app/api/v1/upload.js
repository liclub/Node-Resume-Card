const Router = require('koa-router');
const fs = require("fs");

// 设置路由共有前缀
const router = new Router({
  prefix: '/v1/upload'
});
// ImgUploadValidator 图片上传校验器
const { ImgUploadValidator } = require('../../validators/validator');
// Auth 接口权限校验中间件
const { Auth } = require('../../../middlewares/auth')
const { ResumeBase } = require('../../models/resumeBase');

// 图片上传
router.post('/img', new Auth().m, async (ctx) => {

  // 校验参数
  const v = await new ImgUploadValidator().validate(ctx);
  const uid = ctx.auth.uid;
  const dataBuffer = Buffer.from(v.get('body.imgBase64'), 'base64');
  const name = uid + ".jpg"
  const uploadAddress = global.config.cardHeadSrc;

  // 图片写入服务器
  try {
    fs.writeFileSync(uploadAddress + name, dataBuffer);
  } catch (error) {
    throw new global.errs.UploadError(error.message);
  }

  const resumeBase = await ResumeBase.getByOpenId(uid);

  if (!resumeBase) {
    // 创建名片
    await ResumeBase.create({
      open_id: uid,
      head_src: name
    })
  } else {
    // 图片上传成功更新入库
    await ResumeBase.update({ head_src: name }, {
      where: {
        open_id: uid
      }
    })
  }

  throw new global.errs.Success();
})

module.exports = router;