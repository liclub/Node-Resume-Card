import { Http } from '../utils/http'

class Safe extends Http {

  constructor() {
    super();
    this.prefix = '/v1/safe';
  }
  // 获取安全配置
  async getSafeConfig () {
    return await this.request(this.prefix + '/get', 'GET', null);
  }

  // 更新安全配置
  async updateSafeConfig (params) {
    return await this.request(this.prefix + '/update', 'POST', params);
  }

  // 验证密码
  async checkSafePwd(params) {
    return await this.request(this.prefix + '/check', 'POST', params);
  }
}

export  { Safe }