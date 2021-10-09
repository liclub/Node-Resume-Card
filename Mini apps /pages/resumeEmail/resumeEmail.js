const app = getApp()
import WxValidate from '../../utils/WxValidate.js';
import { rules } from '../../common/js/validatorRules'

Page({
  data: {
    themeObj: app.theme.simpleBtn, // 主题配置项
    theme: '',
    sendItem: {
      email: '',
      title: '',
      tpl: '模板一'
    },
    canSend: true,
    popShow: false,
    tplColumns:['模板一','模板二','模板三','模板四']
  },
  async onLoad() {
    await app.pageLoadInit();
    this.WxValidate = new WxValidate(rules.emailSend.rule, rules.emailSend.message);
  },
  async onShow() {
    const theme = app.getTheme();
    this.setData({ theme });
  },
  inputBlur: function (e) { // input失去焦点处理
    const field = e.target.dataset.field
    this.data.sendItem[field] = e.detail.value
    this.setData({ sendItem: this.data.sendItem })
  },
  sendEmail: app.throttle(async function(event) {
    new Promise(resolve => {
      setTimeout(async () => resolve( await this.dealSend(event)), 300);
    });
  }),
  async dealSend(event) {
    if (!this.data.canSend) {
      return;
    }
    this.setData({canSend: false})
    // 校验
    if (!this.WxValidate.checkForm(event)) {
      const error = this.WxValidate.errorList[0];
      wx.showToast({ title: error.msg, icon: 'none' })
      this.setData({canSend: true})
      return;
    }
    await wx.API.EmailApi.send(this.data.sendItem);
    wx.showToast({title:'发送成功',icon: 'none'})
    this.setData({canSend: true})
    setTimeout(() => {
      app.navroter.navigateBack();
    }, 300);
  },
  pickerSelect() {
    this.setData({ 
      popShow: true
    })
  },
  pickerCancel() { // 关闭popup
    this.setData({ 
      popShow: false
    })
  },
  pickerCheck(e) { // 选中picker里面的哪一个值处理
    const value = e.detail.value; // 选中的值
    this.data.sendItem.tpl = value; // 赋值
    this.setData({ sendItem: this.data.sendItem }); // 绑定
    this.pickerCancel(); // 关闭
  },
  
})
