import { WxApi } from './WxApi'
import { Token } from './Token'
import { Resume } from './Resume'
import { ToPdf } from './ToPdf'
import { Email } from './Email'
import { Message } from './Message'
import { Safe } from './Safe'


class API {
  constructor() {
    this.WxApi = new WxApi();
    this.TokenApi = new Token();
    this.ResumeApi = new Resume();
    this.ToPdfApi = new ToPdf();
    this.EmailApi = new Email();
    this.MessageApi = new Message();
    this.SafeApi = new Safe();
  }
}

module.exports = {
  API
}