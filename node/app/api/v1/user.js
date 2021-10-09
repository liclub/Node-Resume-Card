const Router = require('koa-router');
// 设置路由共有前缀
const router = new Router({
  prefix: '/v1/user'
});
// RegisterValidator 注册校验器
const { RegisterValidator, UserUpdateValidator } = require('../../validators/validator');
// User model实例
const { User } = require('../../models/user')
// Auth 接口权限校验中间件
const { Auth } = require('../../../middlewares/auth')

// 注册
router.post('/register', async (ctx) => {
  // 校验参数
  const v = await new RegisterValidator().validate(ctx);
  const user = {  // 更新实例
    email: v.get('body.email'),
    password: v.get('body.password2'),
    nickname: v.get('body.nickname')
  }
  // 入库
  const r = await User.create(user);

  // 成功返回
  throw new global.errs.Success();
})


// 更新信息
router.post('/update', new Auth().m, async (ctx) => {
  // 校验参数
  const v = await new UserUpdateValidator().validate(ctx);
  const user = {  // 更新实例
    avatarUrl: v.get('body.avatarUrl'),
    city: v.get('body.city'),
    country: v.get('body.country'),
    gender: v.get('body.gender'),
    language: v.get('body.language'),
    nickName: v.get('body.nickName'),
    province: v.get('body.province')
  }
  // 入库
  const r = await User.updateByOpenId(user, ctx.auth.uid);

  // 成功返回
  throw new global.errs.Success();
})

module.exports = router;