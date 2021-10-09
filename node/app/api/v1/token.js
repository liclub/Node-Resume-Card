const Router = require('koa-router');
const { encode } = require('../../../core/util')
// 设置路由共有前缀
const router = new Router({
  prefix: '/v1/token'
});
// TokenValidator token校验器  
// NotEmptyValidator不为空校验器
const {
  TokenValidator,
  NotEmptyValidator
} = require('../../validators/validator');
// 登录类型枚举
const { LoginType } = require('../../lib/enum');
// Auth 接口权限校验中间件
const { Auth } = require('../../../middlewares/auth')
// 微信相关逻辑
const { wxManager } = require('../../service/wx')

router.post('/', async (ctx) => {
  // 校验token
  const v = await new TokenValidator().validate(ctx);
  let userInfo = {};
  let s_id = '';
  let resToken = '';
  // 根据不同登录类型处理
  switch (v.get('body.type')) {
    case LoginType.USER_EMAIL: // 邮箱登录
      break;
    case LoginType.USER_MINI_PROGRAM: // 小程序登录
      const { token, user } = await wxManager.codeToToken(v.get('body.account'))
      if (user.nickName) {
        res.userInfo = { nick_name: user.nick_name, avatar_url: user.avatar_url }
      }
      resToken = token;
      s_id = encode(user.open_id);
      break;
    case LoginType.ADMIN_EMAIL:
      break;
    default:
      throw new global.errs.ParameterException('没有相应的处理')
      break;
  }
  ctx.body = { userInfo, s_id, token: resToken };
})

// 校验token
router.post('/verify', async (ctx) => {
  const v = await new NotEmptyValidator().validate(ctx);
  const result = Auth.verifyToken(v.get('body.token'));
  ctx.body = {
    is_valid: result
  }
})

module.exports = router