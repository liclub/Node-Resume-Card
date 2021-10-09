const app = getApp()

Page({
  data: {
    themeObj: app.theme.simpleBtn, // 主题配置项
    theme: '',
    checkTpl: {},
    checkIdx: '0',
    tplList: [
      {
        tpl_img: '../../common/images/tpl1.png',
        tpl_type: '1'
      },
      {
        tpl_img: '../../common/images/tpl2.png',
        tpl_type: '2'
      },
      {
        tpl_img: '../../common/images/tpl3.png',
        tpl_type: '3'
      },
      {
        tpl_img: '../../common/images/tpl4.png',
        tpl_type: '4'
      },
    ]
  },
  async onLoad() {
    await app.pageLoadInit();
    this.setData({
      checkTpl: this.data.tplList[0]
    })
  },
  async onShow() {
    const theme = app.getTheme();
    this.setData({ theme });
  },
  async createHtmlToPdf() {
    await wx.API.ToPdfApi.toPdf({pdf_type: this.data.checkTpl.tpl_type});
    wx.showToast({ title: '生成pdf成功', icon: 'none' });
    setTimeout(() => {
      app.navroter.navigateBack();
    }, 300);
  },
  checkTpl(e) {
    const idx = e.currentTarget.dataset.idx;
    this.data.tplList[idx].active = true;
    this.setData({
      checkIdx: idx,
      tplList: this.data.tplList,
      checkTpl: this.data.tplList[idx]
    })
  }
  
})
