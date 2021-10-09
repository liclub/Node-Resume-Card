import { Base64 } from 'js-base64';
const { config } = require('../config/config')
import Toast from '../miniprogram_npm/@vant/weapp/toast/toast';

class Http {
  constructor() {
    this.BaseUrl = config.apiBaseURL;
    this.countClient = 0;
  }

  async request(url, method, data, check = true, showToast = true, toastTitle='加载中...') {
    this.countClient++;
    if(showToast) {
      wx.showToast({ title: toastTitle, icon: 'none',mask: true, duration: 6000 })
    }
    let header = { 'content-type': 'application/json' };//设置默认值
    if (check) {
      header.Authorization = _encode();
    }
    return new Promise((resolve, reject) => {
      wx.request({
        header,
        data,
        url: this.BaseUrl + url,
        method,
        success: res => {
          console.log(res);
          // 判断以2（2xx)开头的状态码为正确
          // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
          const code = res.statusCode.toString();
          const startChar = code.charAt(0);
          if (startChar == '2') {
            resolve(res.data)
          } else {
            requestFail(res)
            // reject(res)
          }
        },
        fail: err => {
          requestFail(err)
          // reject(err)
        },
        complete: () => {
          this.countClient--;
          if (this.countClient === 0) {
            wx.hideToast();
          }
        }
      });
    })
  }
}



// 连接失败处理函数
const requestFail = (res) => {
  if (res.errMsg.indexOf('time out') > -1 || res.errMsg.indexOf('timeout') > -1) {
    _toast('请求超时,请检查您的网络');
  } else if (res.errMsg.indexOf('connect error') > -1) {
    _toast('当前网络不佳,请稍后重试');
  } else {
    if (res && res.data && res.data.msg) {
      const msg = _isArray(res.data.msg) ? res.data.msg[0] : res.data.msg
      _toast(msg);
      return;
    }
    _toast('加载数据失败,请稍后尝试');
  }
};

function _isArray(o) {
  return o != null && typeof o == "object" && 'splice' in o && 'join' in o;
};

function _toast(msg) {
  Toast({
    zIndex: 999999999,
    message: msg
  });
}

function _encode() {
  const token = wx.getStorageSync('token')
  const base64 = Base64.encode(token + ':')
  return 'Basic ' + base64
}

export { Http };