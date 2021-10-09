import { Http } from '../utils/http'

class Email extends Http {

  constructor() {
    super();
    this.prefix = '/v1/email';
  }
  // 发送邮件
  async send (params) {
    return await this.request(this.prefix + '/send', 'POST', params, true, true, '邮件发送中......')
  }

}

export  { Email }