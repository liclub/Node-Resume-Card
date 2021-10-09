// 获取应用实例
const app = getApp()
const { ResumeConfig } = require('../../common/js/resumeConfig');
const { encode } = require('../../utils/util')
Page({
  data: {
    linkType: ResumeConfig.linkType, // 模块对应跳转类型
    actions: ResumeConfig.typeActions, // sheet 数组
    resumeBase: app.globalData.resumeBase, // 简历基本信息
    theme:  app.getTheme(), // 主题
    sheetShow: false, // 是否展示sheet
    isOnload: false, // onload是否正在执行
    resumeInfo: {},
    type: '0', // 页面进入类型 1 分享进入  2 扫二维码进入  默认0 小程序正常进入
    editType: '', // 编辑模块type
    share_id: '',
    pwd_show: false,
    password: '',
    beforeClose: (action) =>new Promise((resolve,reject)=> {
      resolve(false)
    })
  },
  async onLoad(options) {
    this.setData({ isOnload: true, theme: app.getTheme() })
    if (options && options.share_id) { // 分享进入
      this.setData({ 
        share_id: decodeURIComponent(options.share_id),
        type: '1' 
      })
    }
    if (options && options.scene) { // 扫描二维码进入
      this.setData({ 
        share_id: decodeURIComponent(options.scene),
        type: '2' 
      })
    }
    await app.pageLoadInit(); // 校验token

    const res = await wx.API.SafeApi.getSafeConfig();


    if (res.safeConfig.share === '否') {
      wx.hideShareMenu();
    }

    if (res.safeConfig.password) {
      this.setData({ pwd_show: true })
      return;
    }
    
    await this.getPageInfo();

    
  },
  async getPageInfo() {
    // 查询信息
    const resumeInfo = await wx.API.ResumeApi.findResume({ 
      share_id: this.data.share_id , 
      type: this.data.type
    });
    // 简历信息放入缓存
    wx.setStorageSync('resumeInfo', resumeInfo);
    // data赋值
    this.setData({ resumeInfo, isOnload: false,resumeBase: resumeInfo.resumeBase })
  },
  async onShow() {
     // 如果正在执行onload 直接返回
     if(this.data.isOnload) {
      return;
    }
    const resumeInfo = await wx.API.ResumeApi.findResume({ 
      share_id: this.data.share_id , 
      type: this.data.type
    });    
    this.setData({ 
      resumeBase: resumeInfo.resumeBase,
      theme: app.getTheme(),
      resumeInfo
    })
    
  },
  inputBlur: function (e) { // input失去焦点处理
    this.data.password = e.detail.value
    this.setData({ password: this.data.password })
  },
  showSheet(event) {
    const editType = event.currentTarget.dataset.type;
    this.setData({ 
      editType, 
      sheetShow: true 
    })
  },
  checkSheet() {
    this.setData({ sheetShow: false })
  },
  preSheet(event) {
    this.setData({ 
      editType: event.detail.editType, 
      sheetShow: true 
    })
  },
  sheetSelect(event) {
    const btnId = event.detail.btnId;
    if (btnId === '1') { // 编辑
      this.switchLink();
    } else if (btnId === '2') { // 删除

    }
    this.setData({ sheetShow: false })
  },
  switchLink() {
    const editType = this.data.editType;
    const url = '../../pages/baseInfo/baseInfo?type=' + this.data.linkType[editType];
    app.navroter.navigateTo({ url })
  },
  async onConfirm() {
    await wx.API.SafeApi.checkSafePwd({ password: encode(this.data.password) })
    this.setData({ pwd_show: false })
    await this.getPageInfo();
  }
})
