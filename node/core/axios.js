const axios = require('axios')
// axios设置代理
const HttpsProxyAgent = require("https-proxy-agent");
const httpsAgent = new HttpsProxyAgent('http://10.1.27.102:8080');

class Axios {
  get m() {
    const isDev = global.config.environment === 'dev';
    let http = '';
    if(isDev) {
      http = axios.create({
        proxy: false,
        httpsAgent
      })
    } else {
      http = axios
    }
    return http;
  }
}

module.exports = {
  Axios
}