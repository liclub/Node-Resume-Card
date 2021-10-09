const { WxAsync } = require("./utils/WxToAsync")
const { API } = require('./services/API');

import navroter from './utils/navroter.js'
import { themeRules as theme }  from './common/js/theme'
import { isNotNull, throttle } from './utils/util'
import Dialog from '/miniprogram_npm/@vant/weapp/dialog/dialog';
import { areaList } from '/miniprogram_npm/@vant/area-data/index';

App({
  throttle, // 函数节流
  areaList,
  theme,
  navroter,
  globalData: {
    userInfo: wx.getStorageSync('userInfo'), // 用户缓存信息
    screenHeight: "", // 屏幕高
    screenWidth: "", // 屏幕宽
    resetBtm: 0, // 苹果X系列header高度
    headerHeight: "", // header高度
    theme: 'default',
    resumeBase: {}
  },
  async onLaunch() {
    wx.Async = WxAsync;
    wx.API = new API();
    this.dealSystemInfo(); // 处理设备信息
  },
  pageLoadInit: async function() {
    await wx.API.TokenApi.verifyToken();
  },
  async dealSystemInfo() {
    const systemInfo = await wx.Async.getSystemInfo();
    this.globalData.screenHeight = systemInfo.windowHeight;
    this.globalData.screenWidth = systemInfo.windowWidth;
    // 单位rpx
    this.globalData.headerHeight = systemInfo.statusBarHeight / ( systemInfo.windowWidth / 750 ) + 88; 
    // 单位px
    this.globalData.headerHeight = systemInfo.statusBarHeight + 46;
    if (systemInfo.model.indexOf("iPhone X") != -1) {
      this.globalData.resetBtm = 100;
    }
  },
  getTheme() {
    const theme = wx.getStorageSync('theme');
    return isNotNull(theme) ? theme : 'theme1'
  },
  setTheme(theme) {
    wx.setStorageSync('theme', theme);
  },
  Toast(msg, that, fun) {
    Dialog.confirm({ context: that, message: msg }).then(() => {
      fun()
    }).catch(() => {
     
    });;
  },
   // b=true 不添加第二个参数的属性到第一个参数
  extend(des, src, b) {
    for (let i in src) {
      if (b && typeof des[i] === "undefined") {
        continue;
      }
      des[i] = src[i] || "";
    }
    return des;
  }

})
