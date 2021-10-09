const app = getApp()

Page({
  data: {
    themeObj: app.theme.simpleBtn, // 主题配置项
    theme: '',
    pdfList: []
  },
  async onLoad() {
    await app.pageLoadInit();
  },
  async getResumePdf() {
    const res = await wx.API.ToPdfApi.getResumePdf();
    if (res.pdf.length > 0) {
      for(let t of res.pdf) {
        const json_date = new Date(t.updated_at).toJSON();
        t.updated_at = new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
      }
    }
    this.setData({
      pdfList: res.pdf
    })
  },
  async createHtmlToPdf() {
    app.navroter.navigateTo({url: '../resumeTpl/resumeTpl'})
  },
  async onShow() {
    const theme = app.getTheme();
    this.setData({ theme });
    await this.getResumePdf();
  },
  async copyPdf(e) {
    const link = e.currentTarget.dataset.link;
    await wx.Async.setClipboardData({ data: link, })
  },
  async lookPdf(e) {
    const url = e.currentTarget.dataset.link;
    wx.showToast({
      title: '加载中，请稍等',
      icon: 'none',
      duration: 6000
    });
    const res = await wx.Async.downloadFile({ url });
    wx.hideToast();
    if (res.statusCode === 200) {
      const Path = res.tempFilePath;
      await wx.Async.openDocument({ filePath: Path });
    }else {
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      });
    }
  }
  
})
