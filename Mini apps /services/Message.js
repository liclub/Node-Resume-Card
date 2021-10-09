import { Http } from '../utils/http'

class Message extends Http {

  constructor() {
    super();
    this.prefix = '/v1/message';
  }

  // 获取系统消息
  async getSysMessage (params) {
    return await this.request(this.prefix + '/get', 'GET', null);
  }

}

export  { Message }