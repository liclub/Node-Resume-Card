
class HttpException extends Error {
  constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
    super() // 调用基类构造函数
    this.errorCode = errorCode
    this.msg = msg
    this.code = code
  }
}

class ParameterException extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 400;
    this.msg = msg || '参数错误';
    this.errorCode = errorCode || 10000;
  }
}

class Success extends HttpException{
  constructor(msg, errorCode) {
    super();
    this.code = 201;
    this.msg = msg || 'ok';
    this.errorCode = errorCode || 0;
  }
}

class NotFound extends HttpException{
  constructor(msg, errorCode) {
    super();
    this.msg = msg || '资源未找到';
    this.errorCode = errorCode || 10000;
    this.code = 404
  }
}


class AuthFailed extends HttpException{
  constructor(msg, errorCode) {
    super();
    this.msg = msg || '授权失败';
    this.errorCode = errorCode || 10004;
    this.code = 401
  }
}


class Forbbiden extends HttpException{
  constructor(msg, errorCode) {
    super();
    this.msg = msg || '禁止访问';
    this.errorCode = errorCode || 10006;
    this.code = 403
  }
}


class LikeError extends HttpException{
  constructor(msg, errorCode) {
    super();
    this.msg = '你已经点赞过了';
    this.errorCode = 60001;
    this.code = 400
  }
}


class DisLikeError extends HttpException{
  constructor(msg, errorCode) {
    super();
    this.msg = '你已经取消点赞';
    this.errorCode = 60002;
    this.code = 400
  }
}


class UploadError extends HttpException{
  constructor(err) {
    super();
    this.msg = err;
    this.errorCode = 50001;
    this.code = 400
  }
}

class SendError extends HttpException{
  constructor(msg, errorCode) {
    super();
    this.msg = '发送失败';
    this.errorCode = 60001;
    this.code = 400
  }
}


class InsertCustomerError extends HttpException{
  constructor(msg, errorCode) {
    super();
    this.msg = '您已经存入过名片夹';
    this.errorCode = 60002;
    this.code = 400
  }
}

class PassWordError extends HttpException{
  constructor(err) {
    super();
    this.msg = '密码不正确';
    this.errorCode = 50001;
    this.code = 400
  }
}


module.exports = { 
  HttpException, 
  ParameterException, 
  Success,
  NotFound,
  AuthFailed,
  Forbbiden,
  LikeError,
  DisLikeError,
  UploadError,
  InsertCustomerError,
  SendError,
  PassWordError
}