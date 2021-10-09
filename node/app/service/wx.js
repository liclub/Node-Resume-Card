const util = require('util') //node js自带的工具类
const fs = require("fs");
const { Axios } = require('../../core/axios')

// user实例
const { User } = require('../models/user')
const { Resume } = require('../models/resume')
const { ResumeBase } = require('../models/resumeBase')

const { AccessToken } = require('../models/accessToken')

// 令牌成圣
const { generateToken } = require('../../core/util')
// 接口权限中间件
const { Auth } = require('../../middlewares/auth')
class wxManager {

  // 小程序登录 auth.code2Session
  // 登录凭证校验。通过 wx.login 接口获得临时登录凭证 code 后传到开发者服务器调用此接口完成登录流程。
  static async codeToToken(code) {
    // format 格式化字符串
    const url = util.format(global.config.wx.loginUrl,
      global.config.wx.app_id,
      global.config.wx.app_secret,
      code)

    const result = await new Axios().m.get(url);
    const errCode = result.data.errcode;
    const errMsg = result.data.errmsg;

    if (result.status !== 200) {
      throw new global.errs.AuthFailed('open获取失败');
    }
    if (errCode) {
      throw new global.errs.AuthFailed('open获取失败' + errCode + errMsg);
    }
    const open_id = result.data.openid;
    let user = await User.getUserByOpenId(open_id);
    if (!user) {
      user = await User.registerByOpenId(open_id)
    }
    let resume = await Resume.getResumeByOpenId(open_id);
    if (!resume) {
      await Resume.registerResume(open_id)
    }
    await Resume.initResume(open_id, resume);
    // 根据userid生成令牌
    const token = generateToken(user.open_id, Auth.USER);
    return { token, user }
  }

  static async generatorAccessToken(code) {
    // format 格式化字符串
    const url = util.format(global.config.wx.accessToken,
      global.config.wx.app_id,
      global.config.wx.app_secret)

    const result = await new Axios().m.get(url);
    const errCode = result.data.errcode;
    const errMsg = result.data.errmsg;

    if (result.status !== 200) {
      throw new global.errs.AuthFailed('accessToken获取失败');
    }
    if (errCode) {
      throw new global.errs.AuthFailed('accessToken获取失败' + errCode + errMsg);
    }

    // 获取信息入库
    const nowTime = new Date().getTime();
    const diff = result.data.expires_in - 1000;
    const exptime = nowTime + (diff * 1000);

    const accessToken = result.data.access_token;
    const dbAccessToken = await AccessToken.dbAccessToken();
    if (dbAccessToken) {
      await AccessToken.updateAccessToken(accessToken, exptime);
    } else {
      await AccessToken.createAccessToken(accessToken, exptime);
    }
    return accessToken;
  }

  static async getAccessToken() {
    let token = '';
    // 1.查询数据库
    const accessToken = await AccessToken.dbAccessToken();
    // 2.有值判断是否在有效时间内 在则返回
    if (accessToken) {
      const exptime = parseInt(accessToken.exptime);
      const nowTime = new Date().getTime();
      const diff = exptime - nowTime;
      if (diff > 0) { // 有效
        return accessToken.accessToken;
      }
    }
    // 不在有效时间内则重新生成入库
    token = await wxManager.generatorAccessToken();
    return token;
  }

  static async generateQrocode(pageUrl, scene, id) {
    const accessToken = await wxManager.getAccessToken();
    // format 格式化字符串
    const url = util.format(global.config.wx.getwxacodeunlimit, accessToken);
    let data = {
      scene: scene,
      page: pageUrl,
      width: 430,
      auto_color: false,
      line_color: {
        r: 0,
        g: 0,
        b: 0
      }
    }
    const post_data = JSON.stringify(data);
    const header = { headers: { 'Content-Type': 'application/json', 'charset': 'utf-8', 'Content-Length': post_data.length } };
    const result = await new Axios().m.post(
      url,
      post_data,
      {
        header,
        responseType: 'arraybuffer'
      }
    );

    const errCode = result.data.errcode;
    const errMsg = result.data.errmsg;

    if (result.status !== 200) {
      throw new global.errs.AuthFailed('generateQrocode获取失败');
    }
    if (errCode) {
      throw new global.errs.AuthFailed('generateQrocode获取失败' + errCode + errMsg);
    }
    const imgPath = global.config.qrcodePath;
    const name = 'personalQrcode' + id + '.png';
    try {
      fs.writeFileSync(imgPath + name, result.data);
    } catch (error) {
      throw new global.errs.UploadError(error.message);
    }

    // 返回生成base64
    const base64 = result.data.toString('base64');
    return base64;
  }
}

module.exports = {
  wxManager
}