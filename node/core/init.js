// Koa-router 是koa 的一个路由中间件,它可以将请求的URL和方法
// (如:GET、 POST、 PUT、 DELETE 等) 匹配到对应的响应程序或页面
const Router = require('koa-router');
// require-directory 路由自动加载
const requireDirectory = require('require-directory');
const lodash = require('lodash');

class InitManager {
  // app koa实例
  static initCore(app) {    // 入口方法
    InitManager.app = app;
    // 装载路由
    InitManager.initLoadRouters();
    // config配置挂载到node全局变量global上
    InitManager.loadConfig();
    // 异常挂载到node全局变量gloabal上
    InitManager.loadHttpException();
    global._ = lodash; // lodash 全局挂载
  }

  // 装载路由
  static initLoadRouters(app) {
    //api绝对路径 process.cwd() 获取项目根目录
    const apiDirectory = `${process.cwd()}/app/api`;
    // 路由自动导入
    // 参数：第一个参数固定参数module，
    // 第二个参数要加载的模块的文件路径，
    // 第三个参数：每次加载一个参数执行的函数
    requireDirectory(module, apiDirectory, {
      visit: whenLoadModule
    });

    // 每次去导入路由都会调用，判断是否是一个router
    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        //如果是则挂载到app
        InitManager.app.use(obj.routes())
      }
    }
  }

  //异常类装载到global上面
  static loadHttpException() {
    const errors = require('./http-exception')
    global.errs = errors;
  }

  // 加载配置文件
  static loadConfig(path = '') {
    const configPath = path || process.cwd() + '/config/config.js';
    const config = require(configPath);
    global.config = config;
  }

}

module.exports = InitManager