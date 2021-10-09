import { Http } from '../utils/http'

class WxApi extends Http {

  constructor() {
    super();
    this.prefix = '/v1/wx';
  }
  // 获取二维码图片
  async getQrCode (params) {
    return await this.request(this.prefix + '/getQrcode', 'POST', params)
  }

}

export  { WxApi }