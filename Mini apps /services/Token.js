import { Http } from '../utils/http'
  
class Token extends Http {

  constructor() {
    super();
    this.prefix = '/v1/token';
  }
  // 生成token
  async tokenApi (params) {
    return await this.request(this.prefix, 'POST', params, false)
  }
  // token校验
  async verifyApi (params) {
    return await this.request(this.prefix + '/verify', 'POST', params)
  }

  async verifyToken() {
    const token = wx.getStorageSync("token");
    const tokenTimeNow = wx.getStorageSync('tokenTimeNow');
    const now = new Date().getTime();
    if (!token || !tokenTimeNow) {
      await this._generateToken();
      return;
    }
    if (token && tokenTimeNow) {
      const compareTime = now - tokenTimeNow;
      // 24小时
      if (compareTime > 86400000) {
        const theme = wx.getStorageSync('theme');
        wx.clearStorageSync();
        wx.setStorageSync('theme', theme);
        await this._generateToken();
      }
    }
  }

  // 生成token
  async _generateToken() {
    let App = getApp();
    const loginRes = await wx.Async.login();
    const res = await this.tokenApi({ account: loginRes.code, type: 100 });
    wx.setStorageSync('token', res.token);
    wx.setStorageSync('tokenTimeNow', new Date().getTime());
    wx.setStorageSync('s_id', res.s_id);
    const userInfo = wx.getStorageSync('userInfo');
    if (!(userInfo && userInfo.nickName)) {
      App.globalData.userInfo = res.userInfo;
      wx.setStorageSync('userInfo', res.userInfo);
    }
  }
  
}

export  { Token }