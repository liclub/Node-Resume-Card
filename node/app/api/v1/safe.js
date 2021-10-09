const Router = require('koa-router');
const { ResumeSafe } = require('../../models/resumeSafe');
const { decode } = require('../../../core/util')
// 设置路由共有前缀
const router = new Router({
  prefix: '/v1/safe'
});
const { CommonValidator, PasswordValidator } = require('../../validators/validator');
// Auth 接口权限校验中间件
const { Auth } = require('../../../middlewares/auth');


// 获取安全配置
router.get('/get', new Auth().m, async (ctx) => {
  const open_id = ctx.auth.uid;
  const safeConfig = await ResumeSafe.findOne({
    where: {
      open_id
    }
  })
  ctx.body = {
    safeConfig
  }
})

// 更新配置
router.post('/update', new Auth().m, async (ctx) => {
  const v = await new CommonValidator().validate(ctx);
  const open_id = ctx.auth.uid;
  const decodePwd = decode(v.get('body.password'));
  await ResumeSafe.saveSafeConfig(open_id, {
    password: decodePwd ? v.get('body.password') : '',
    share: v.get('body.share'),
    collection: v.get('body.collection'),
  })
  throw new global.errs.Success();
})



// 验证配置
router.post('/check', new Auth().m, async (ctx) => {
  const v = await new PasswordValidator().validate(ctx);
  const open_id = ctx.auth.uid;
  const safe = await ResumeSafe.findOne({
    where: {
      open_id
    }
  })
  const dbPwd = decode(safe.password);
  const reqPwd = decode(v.get('body.password'));
  if (dbPwd !== reqPwd) {
    throw new global.errs.PassWordError();
  }else {
    throw new global.errs.Success();
  }

})



module.exports = router;