const Router = require('koa-router');
const { ResumeMessage } = require('../../models/resumeMessage');

// 设置路由共有前缀
const router = new Router({
  prefix: '/v1/message'
});
const { CommonValidator } = require('../../validators/validator');
// Auth 接口权限校验中间件
const { Auth } = require('../../../middlewares/auth');

// 获取系统消息
router.get('/get', new Auth().m, async (ctx) => {
  const sysMessages = await ResumeMessage.getSystemMsg();
  ctx.body = {
    sysMessages
  }
})


module.exports = router;