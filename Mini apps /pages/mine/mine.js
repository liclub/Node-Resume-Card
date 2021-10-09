
const app = getApp()

Page({
  data: {
    active: 1,
    theme: '',
    link: {
      message: '../message/message',
      safe: '../safe/safe'
    }
  },
  async onLoad() {
    this.setData({ theme: app.getTheme() })
    await app.pageLoadInit();
  },
  link_to(event){
    const type = event.currentTarget.dataset.type;
    const url = this.data.link[type];
    app.navroter.navigateTo({ url })
  }
  
})
