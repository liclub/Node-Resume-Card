const app = getApp()
const { encode } = require('../../utils/util');

Page({
  data: {
    themeObj: app.theme.simpleBtn, // 主题配置项
    theme: '',
    safeItem: {
      password: '',
      share: '是',
      collection: '是'
    },
    canSend: true,
    popShow: false,
    tplColumns:['是','否'],
    checkFiled: ''
  },
  async onLoad() {
    await app.pageLoadInit();
  },
  async onShow() {
    const theme = app.getTheme();
    this.setData({ theme });
  },
  inputBlur: function (e) { // input失去焦点处理
    const field = e.target.dataset.field
    this.data.safeItem[field] = e.detail.value
    this.setData({ safeItem: this.data.safeItem })
  },
  safeConfig: app.throttle(async function(event) {
    new Promise(resolve => {
      setTimeout(async () => resolve( await this.dealSend(event)), 300);
    });
  }),
  async dealSend(event) {
    if (!this.data.canSend) {
      return;
    }
    this.setData({canSend: false})
    this.data.safeItem.password = encode(this.data.safeItem.password);
    await wx.API.SafeApi.updateSafeConfig(this.data.safeItem);
    wx.showToast({title:'保存成功',icon: 'none'})
    this.setData({canSend: true})
  },
  pickerSelect(e) {
    this.setData({ 
      popShow: true,
      checkFiled: e.target.dataset.field
    })
  },
  pickerCancel() { // 关闭popup
    this.setData({ 
      popShow: false
    })
  },
  pickerCheck(e) { // 选中picker里面的哪一个值处理
    const value = e.detail.value; // 选中的值
    this.data.safeItem[this.data.checkFiled] = value; // 赋值
    this.setData({ safeItem: this.data.safeItem }); // 绑定
    this.pickerCancel(); // 关闭
  },
  
})
