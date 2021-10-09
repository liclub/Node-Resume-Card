// index.js
// 获取应用实例
const app = getApp()
const { base64src } = require('../../utils/util')
Page({
  data: {
    theme:  app.getTheme(),
    qrcodeBase: '',
    erweima: '',
    resumeBase: {},
    head_src: '../../common/images/default.jpg'
  },
  async onLoad() {
    this.setData({ theme: app.getTheme() })
    await app.pageLoadInit();
    this.createQrcode();
    this.setData({
      resumeBase: app.globalData.resumeBase,
    })
    if (this.data.resumeBase.head_src) {
      this.setData({
        head_src: this.data.resumeBase.head_src
      })
    }
  },
  async getQrcodeService() { //获取二维码接口
    // 获取二维码
    let that = this;
    const qrCode = await wx.API.WxApi.getQrCode({page: 'pages/index/index'});
    const qrcodeBase = 'data:image/jpeg;base64,' + qrCode.base64;
    this.setData({ qrcodeBase });
    wx.setStorageSync("qrcode", qrcodeBase);
    const promise = base64src(qrcodeBase, "undefined" + new Date().getMilliseconds());
    promise.then(function (value) {
      that.setData({ erweima: value });
    });
  },
  async createQrcode() { //创建分享二维码
    let that = this;
    if (wx.getStorageSync("qrcode")) {
      that.setData({ qrcodeBase: wx.getStorageSync("qrcode") });
      var promise = base64src(that.data.qrcodeBase, "undefined" + new Date().getMilliseconds());
      promise.then(function (value) {
        that.setData({ erweima: value })
      });
      return;
    }
    await app.pageLoadInit();
    await that.getQrcodeService();
  },
  onShow() {
    this.setData({ theme: app.getTheme() })
  }
  
})
