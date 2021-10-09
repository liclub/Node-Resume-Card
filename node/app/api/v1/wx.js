const Router = require('koa-router');
const fs = require("fs")

// 设置路由共有前缀
const router = new Router({
  prefix: '/v1/wx'
});
// ImgUploadValidator 图片上传校验器
const { QrcodeGetValidator } = require('../../validators/validator');
// Auth 接口权限校验中间件
const { Auth } = require('../../../middlewares/auth');
const { wxManager } = require('../../service/wx')
// 获取二维码图片
router.post('/getQrcode', new Auth().m, async (ctx) => {

  const v = await new QrcodeGetValidator().validate(ctx);
  const scene = encodeURIComponent(ctx.auth.uid);
  const imgPath = global.config.qrcodePath;
  const name = 'personalQrcode' + ctx.auth.uid + '.png';
  const img = imgPath + name;

  let base64 = '';
  // 检查文件是否存在于当前目录中。 
  try {
    fs.accessSync(img, fs.constants.F_OK);
    let file = null;
    file = fs.readFileSync(img); //读取文件
    const bufferData = Buffer.from(file).toString("base64");
    base64 = "data:" + mime.lookup(filePath) + ";base64," + bufferData;
  } catch (error) {
    base64 = await wxManager.generateQrocode(v.get('body.page'), scene, ctx.auth.uid);
  }

  ctx.body = {
    base64
  }

})

module.exports = router;