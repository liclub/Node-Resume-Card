//Koa (koajs) 是一个新的 web 框架,由 Express 幕后的原班人马打造,
//致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石
const Koa = require('koa');
const InitManager = require('./core/init');
// 全局异常处理
const catchError = require('./middlewares/exception');

//实例化koa
const app = new Koa();
//将post请求的参数转为json格式返回
const parse = require('koa-bodyparser');

//初始化
app.use(parse())
app.use(catchError)
InitManager.initCore(app);

app.listen(3019);