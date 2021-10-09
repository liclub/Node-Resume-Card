import { Http } from '../utils/http'

class ToPdf extends Http {

  constructor() {
    super();
    this.prefix = '/v1/to_pdf';
  }
  // 生成简历pdf
  async toPdf (params) {
    return await this.request(this.prefix + '/', 'POST', params)
  }

  // 获取简历pdf
  async getResumePdf() {
    return await this.request(this.prefix + '/get', 'GET', null)
  }

}

export  { ToPdf }