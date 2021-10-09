
const app = getApp()

Page({
  data: {
    active: 1,
    theme: '',
    message: []
  },
  async onLoad() {
    this.setData({ theme: app.getTheme() })
    await app.pageLoadInit();
    const res = await wx.API.MessageApi.getSysMessage();
    this.setData({ message: res.sysMessages })
  }
  
})
