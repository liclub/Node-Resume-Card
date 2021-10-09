import { Base64 } from 'js-base64'

const fsm = wx.getFileSystemManager();
const salting = 'fIy8YlQB1CzXlq3RUuJm420WzfV9pkyx';

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

// 解析扫码路径参数
const getCodeParam = (name, route) => {
  if (route) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    const r = route.match(reg);
    if (r != null) return unescape(r[2]);
    return "-1";
  }
  return "-1";
}


const base64src = function (base64data, FILE_BASE_NAME) {
  return new Promise((resolve, reject) => {
    const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];
    if (!format) {
      reject(new Error('ERROR_BASE64SRC_PARSE'));
    }
    const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
    const buffer = wx.base64ToArrayBuffer(bodyData);
    fsm.writeFile({
      filePath,
      data: buffer,
      encoding: 'binary',
      success() {
        resolve(filePath);
      },
      fail() {
        reject(new Error('ERROR_BASE64SRC_WRITE'));
      },
    });
  });
};

//b=true 不添加第二个参数的属性到第一个参数
const extend = function (des, src, b) {
  for (var i in src) {
    if (b && isUndefined(des[i]))
      continue;
    des[i] = src[i] || "";
  }
  return des;
};

const isUndefined = function (o) {
  return typeof o == "undefined";
};

const urlTobase64 = function (url, fun) {
  wx.request({
    url: url,
    responseType: 'arraybuffer', //最关键的参数，设置返回的数据格式为arraybuffer
    success: res => {
      let base64 = wx.arrayBufferToBase64(res.data);
      if (typeof fun == "function") fun(base64)
    }
  })
}
const toBase64 = function (url, type) {
  return new Promise((resolve, reject) => {
    wx.getFileSystemManager().readFile({
      filePath: url, //选择图片返回的相对路径
      encoding: 'base64', //编码格式
      success: res => {
        resolve(res.data)
      },
      fail: res => reject(res.errMsg)
    })
  })
}

const rpx2px = function (rpx, windowWidth) {
  return Math.round(rpx / 750 * windowWidth);
}

const isArray = function (o) {
  return o != null && typeof o == "object" && 'splice' in o && 'join' in o;
};

// 加密
const encode = (name) => {
  return Base64.encode(name + salting)
}

// 解密
const decode = (name) => {
  let decodeName = Base64.decode(name) || ''
  if (decodeName && decodeName.split && decodeName.split(salting) && decodeName.split(salting)[0]) {
    return decodeName.split(salting)[0]
  } else {
    return ''
  }
}

const isNotNull = (val) => {
  if(val !== null && val !== '' && val !== 'null' && val !== undefined && val !== 'undefined') {
    return true;
  }
  return false;
}

const getMyDate = function(str) {
  let oDate = new Date(str),
    oYear = oDate.getFullYear(),
    oMonth = oDate.getMonth() + 1,
    oDay = oDate.getDate(),
    oTime =
    oYear +
    "-" +
    getzf(oMonth) +
    "-" +
    getzf(oDay); // 最后拼接时间
  return oTime;

  function getzf(num) {
    if (parseInt(num) < 10) {
      num = "0" + num;
    }
    return num;
  }
};


function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
      gapTime = 1500
  }

  let _lastTime = null

  // 返回新的函数
  return function () {
      let _nowTime = + new Date()
      if (_nowTime - _lastTime > gapTime || !_lastTime) {
          fn.apply(this, arguments)   //将this和参数传给原函数
          _lastTime = _nowTime
      }
  }
}


module.exports = {
  formatTime,
  formatNumber,
  getCodeParam,
  base64src,
  extend,
  urlTobase64,
  rpx2px,
  toBase64,
  isArray,
  encode,
  decode,
  isNotNull,
  getMyDate,
  throttle
}
