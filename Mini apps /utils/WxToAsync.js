// promisify() 返回的是一个函数，
// 这个函数跟传入的 fn（即 wx.abcd） 签名相同（或兼容）
//  接受一个单一参数对象
//  返回一个 Promise 对象
//  调用原函数并使用改造过的新的参数对象
//  这个新参数对象得有原本传入的参数，
//  当然得兼容没有传入参数的情况
//  注入 success 回调，resovle 它
//  注入 fail 回调，reject 它

function promisify(fn) {
  return async function (args) {
      return new Promise((resolve, reject) => {
          fn({
              ...(args || {}),
              success: res => resolve(res),
              fail: err => reject(err)
          });
      });
  };
}

// 这里 names 期望是一个数组
function toAsync(names) {
  return (names || [])
      .map(name => (
          {
              name,
              member: wx[name]
          }
      ))
      .filter(t => typeof t.member === "function")
      .reduce((r, t) => {
          r[t.name] = promisify(wx[t.name]);
          return r;
      }, {});
}

Promise.prototype.ignoreError = function() {
    return this.catch(() => { });
};

const names = [
  'login',
  'getSystemInfo',
  'getLocation',
  'canIUse',
  'openSetting',
  'request',
  'getFileSystemManager',
  'chooseImage',
  'getImageInfo',
  'checkSession',
  'canvasToTempFilePath',
  'saveImageToPhotosAlbum',
  'getSetting',
  'authorize',
  'setClipboardData',
  'getClipboardData',
  'getFileInfo',
  'showModal',
  'downloadFile',
  'openDocument'
];

const WxAsync = toAsync(names);

module.exports = {
  WxAsync
}