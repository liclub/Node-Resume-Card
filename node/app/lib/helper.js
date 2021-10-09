// 成功异常返回 msg提示信息  errorCode 状态码返回
function success(msg, errorCode) {
  throw new global.errs.Success(msg, errorCode)
}

module.exports = { success }