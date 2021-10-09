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
    const that = this;
    if (this.data.resumeBase.head_src) {
      const promise = base64src(this.data.resumeBase.head_src, "undefined" + new Date().getMilliseconds());
      promise.then(function (value) {
        that.setData({ head_src: value });
      });
    }
  },
  async getQrcodeService() { //获取二维码接口
    // 获取二维码
    let that = this;
    const qrCode = await wx.API.WxApi.getQrCode({page: 'pages/resume/resume'});
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
  },
  saveImage() {
    const ctx = wx.createCanvasContext('shareFrends'); //绘图上下文

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 572, 800);

    //头像  
    ctx.beginPath(); //开始绘制
    ctx.save()
    ctx.arc(155, 90, 40, 0, 2 * Math.PI);
    ctx.clip()
    ctx.drawImage(this.data.head_src, 115, 50, 80, 80);
    ctx.restore();
    
    //姓名
    ctx.font = 'normal blod 17px sans-serif';
    ctx.setFillStyle('#000')
    ctx.fillText(this.data.resumeBase.user_name, 135, 175);
    
    //工作 
    ctx.font = 'normal 13px sans-serif';
    ctx.setFillStyle('#ccc')
    ctx.fillText(this.data.resumeBase.job, 115, 200);

    //二维码
    ctx.drawImage(this.data.erweima, 90, 240, 120, 120);

    // 最后标语
    ctx.fillText("扫二维码查询我的简历", 85, 390);

    ctx.draw();

    //canvas画图需要时间而且还是异步的，所以加了个定时器
    const that = this;
    wx.showToast({ title: '图片生成中......', icon: 'none' })
    new Promise(resolve => {
      setTimeout(() => resolve(that.imageSave('shareFrends')), 2000);
    });
  },
  async imageSave(canvasId) {
    // 将生成的canvas图片，转为真实图片
    const res = await wx.Async.canvasToTempFilePath({ 
      width: 300,
      height: 450,
      quality: 1,
      x: 0,
      y: 0,
      canvasId: canvasId 
    })
    this.setData({ shareImg: res.tempFilePath });
    wx.hideLoading();
    await this.saveImg();
  },
  // 保存图片
  async saveImg() {
    let that = this;
    const res = await wx.Async.getSetting();
    // 获取用户是否开启用户授权相册 如果没有则获取授权
    if (!res.authSetting['scope.writePhotosAlbum']) {
      const authRes = await wx.Async.authorize({ scope: 'scope.writePhotosAlbum' })
      if (authRes) {
        await that.savePicFunction();
      }
    } else {
      // 有则直接保存
      await that.savePicFunction();
    }
  },
  async savePicFunction() {
    try {
      console.log(this.data.shareImg)
      await wx.Async.saveImageToPhotosAlbum({ filePath: this.data.shareImg })
      wx.hideToast();
      wx.showToast({ title: '保存成功' })
    } catch (error) {
      console.log(error)
      wx.showToast({ title: '保存失败', icon: 'none' })
    }
  },
})
