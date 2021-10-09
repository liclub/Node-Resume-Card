// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    theme:  app.getTheme(),
    themeList: [
      { themeName: 'default', name: '极简' },
      { themeName: 'theme1', name: '青蓝' },
      { themeName: 'theme2', name: '中国红' },
      { themeName: 'theme3', name: '橘红' },
      { themeName: 'theme4', name: '孔雀绿' }
    ]
  },
  async onLoad() {
    this.setData({ theme: app.getTheme() })
    await app.pageLoadInit();
  },
  onShow() {
    this.setData({ theme: app.getTheme() })
  },
  checkTheme(e) {
    const theme = e.currentTarget.dataset.theme
    app.setTheme(theme);
    app.navroter.navigateBack({})
  }
  
})
