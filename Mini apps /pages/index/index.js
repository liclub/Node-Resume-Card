// index.js
// 获取应用实例
const app = getApp()
const { base64src } = require('../../utils/util');

Page({
  data: {
    isOnload: false, // onload是否正在执行
    active: 0,
    theme: '',
    head_src: '../../common/images/default.jpg',
    resumeBase: {
      user_name: '大牛',
      job: '软件开发工程师',
      sex: '男',
      age: '28',
      work_years: '5年',
      birthday: '1994-02-06',
      city: '上海市浦东新区',
      job_status: '目前正在找工作,已离职',
      education: '本科'
    }
  },
  async onLoad() {
    this.setData({ isOnload: true, theme: app.getTheme() })
    // 校验token
    await app.pageLoadInit();
    // 获取基本信息
    await this.getResumeBase();
    this.setData({ isOnload: false })
  },
  async getResumeBase() {
    const that = this;
    // 先从globalData 拿数据 有的话就不请求接口
    const globalBase = app.globalData.resumeBase;
    if (globalBase.user_name) {
      that.createShareImg();
      return;
    }
    // 没有请求接口获取基本数据
    const res = await wx.API.ResumeApi.findResumeBase();
    this.setData({ resumeBase: res.resumeBase })
    app.globalData.resumeBase = res.resumeBase;
    // 拿到基本数据 判断是否有头像没有不需要二次处理
    if(!res.resumeBase.head_src) {
      that.createShareImg();
      return;
    }
    // 有头像二次处理
    const promise = base64src(res.resumeBase.head_src, "undefined" + new Date().getMilliseconds());
    promise.then(function (value) {
      that.setData({ head_src: value })
      that.createShareImg();
    });
  },
  onShow() {
    // 如果正在执行onload 直接返回
    if(this.data.isOnload) {
      return;
    }
    // 判断基本信息是否更改
    const baseChange = this.checkIsChange(this.data.resumeBase, app.globalData.resumeBase);
    // 判断主题是否更改
    const themeChange = this.checkIsChange(this.data.theme, app.getTheme());
    this.setData({ theme: app.getTheme(),resumeBase: app.globalData.resumeBase })
    // 更改重新画图
    if (!baseChange || !themeChange) {
      this.createShareImg();
    }
  },
  // 比较两个值是否相同
  checkIsChange(value, compare) {
    if (JSON.stringify(value) === JSON.stringify(compare)) {
      return true;
    }
    return false;
  },
  // 绘制分享图片
  createShareImg() {
    wx.hideShareMenu();
    const resumeBase = app.globalData.resumeBase;
    const bg = app.theme.canvasBg[this.data.theme];
    const ctx = wx.createCanvasContext('share_canvas'); //绘图上下文
    let fontColor = '#fff';
    if (this.data.theme === 'default') {
      fontColor = '#000';
    }
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 339, 240);
    
    //提示
    ctx.font = 'normal 16px sans-serif';
    ctx.setFillStyle('#000')
    ctx.fillText('我正在寻找工作，这是我的工作简历，请查阅', 1, 20);

    //圆角矩形
    this.roundRect(ctx, 0, 30, 339, 240, 10, bg);
    ctx.save()

    //头像  
    ctx.beginPath(); //开始绘制
    ctx.arc(65, 70, 25, 0, 2 * Math.PI);
    ctx.clip()
    ctx.drawImage(this.data.head_src, 40, 45, 50, 50);
    ctx.restore();

    //姓名
    ctx.font = 'normal blod 15px sans-serif';
    ctx.setFillStyle(fontColor)
    ctx.fillText(resumeBase.user_name, 110, 65);

     //工作 
    ctx.font = 'normal 13px sans-serif';
    ctx.setFillStyle(fontColor)
    ctx.fillText(resumeBase.job, 110, 85);

    // 线条
    ctx.beginPath();//开始一个新的路径
    ctx.strokeStyle="#fff";
    ctx.moveTo(10,110);//路径的起点
    ctx.lineTo(329,110);//路径的终点
    ctx.lineWidth = 0.7;
    ctx.stroke();//对当前路径进行描边
    ctx.closePath();//关闭当前路径

    // 性别
    ctx.font = 'normal 14px sans-serif';
    ctx.setFillStyle(fontColor)
    ctx.fillText('性别', 30, 135);

    ctx.font = 'normal 12px sans-serif';
    ctx.setFillStyle(fontColor)
    ctx.fillText(resumeBase.sex, 35, 170);

    // 年龄
    ctx.font = 'normal 14px sans-serif';
    ctx.setFillStyle(fontColor)
    ctx.fillText('年龄', 110, 135);

    ctx.font = 'normal 12px sans-serif';
    ctx.setFillStyle(fontColor)
    ctx.fillText(resumeBase.age, 115, 170);

    // 学历
    ctx.font = 'normal 14px sans-serif';
    ctx.setFillStyle(fontColor)
    ctx.fillText('学历', 190, 135);

    ctx.font = 'normal 12px sans-serif';
    ctx.setFillStyle(fontColor)
    ctx.fillText(resumeBase.education, 192, 170);

    // 工龄
    ctx.font = 'normal 14px sans-serif';
    ctx.setFillStyle(fontColor)
    ctx.fillText('工龄', 270, 135);

    ctx.font = 'normal 12px sans-serif';
    ctx.setFillStyle(fontColor)
    ctx.fillText(resumeBase.work_years, 272, 170);

    // 线条
    ctx.beginPath();//开始一个新的路径
    ctx.strokeStyle="#fff";
    ctx.moveTo(10,185);//路径的起点
    ctx.lineTo(329,185);//路径的终点
    ctx.lineWidth = 0.7;
    ctx.stroke();//对当前路径进行描边
    ctx.closePath();//关闭当前路径

    // 工作状态
    ctx.font = 'normal 14px sans-serif';
    ctx.setFillStyle(fontColor)
    ctx.fillText(resumeBase.city, 30, 220);

    ctx.font = 'normal 12px sans-serif';
    ctx.setFillStyle(fontColor)
    ctx.fillText(resumeBase.job_status, 30, 240);

    ctx.draw();
    const that = this;
    new Promise(resolve => {
      setTimeout(async () => resolve( await that.dealShareImg('share_canvas')), 300);
    });
  },
  async dealShareImg(canvasId) {
    // 将生成的canvas图片，转为真实图片
    const res = await wx.Async.canvasToTempFilePath({ x: 0, y: 0, canvasId: canvasId})
    let shareImg = res.tempFilePath;
    console.log(shareImg)
    this.setData({ shareImg: shareImg });
    wx.showShareMenu();
  },
  /**
   * 绘制圆角矩形
   * @param {Object} context - canvas组件的绘图上下文
   * @param {Number} x - 矩形的x坐标
   * @param {Number} y - 矩形的y坐标
   * @param {Number} w - 矩形的宽度
   * @param {Number} h - 矩形的高度
   * @param {Number} r - 矩形的圆角半径
   * @param {String} [c = 'transparent'] - 矩形的填充色
   */
  roundRect(context, x, y, w, h, r, c = 'transparent') {
    if (w < 2 * r) {
      r = w / 2;
    }
    if (h < 2 * r) {
      r = h / 2;
    }

    context.beginPath();
    context.fillStyle = c;

    context.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
    context.moveTo(x + r, y);
    context.lineTo(x + w - r, y);
    context.lineTo(x + w, y + r);

    context.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2);
    context.lineTo(x + w, y + h - r);
    context.lineTo(x + w - r, y + h);

    context.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5);
    context.lineTo(x + r, y + h);
    context.lineTo(x, y + h - r);

    context.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI);
    context.lineTo(x, y + r);
    context.lineTo(x + r, y);

    context.fill();
    context.closePath();
    // 剪切
    context.clip()
  },
  shareMenu() {
    this.onShareAppMessage()
  },
  //分享
  onShareAppMessage: function (res) {   
    return {
      path: '/pages/resume/resume?share_id=' + encodeURIComponent(wx.getStorageSync('s_id')),
      imageUrl: this.data.shareImg,
      success: function (res) {
        console.log('转发成功')
      },
      fail: function (res) {
        wx.showToast({
          title: '转发失败',
          duration: 2000
        });
      }
    }
  },
  
})
