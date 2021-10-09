const { ResumeConfig } = require('../../common/js/resumeConfig');
const app = getApp()

Page({
  data: {
    describe:ResumeConfig.describe, // 页面展示描述信息
    themeObj: app.theme, // 主题配置项
    theme: '', // 当前主题
    type: '', // 当前简历编辑模块类型
    id: '', // 当前简历编辑模块类型带有数据的 id 
    queryList: [], // 列表展示查询信息
    query: {}, // 详细查询信息
    screenHeight: app.globalData.screenHeight,
    screenWidth: app.globalData.screenWidth
  },
  async onLoad(options) {
    await app.pageLoadInit();
    // 获取简历编辑模块类型
    if (options && options.type) {
      this.setData({ type: options.type })
    }
    // 获取当前简历编辑模块类型带有数据的 id 
    if (options && options.id) {
      this.setData({ id: options.id })
      // 根据id查询信息 方法定义在配置项里面  根据 字符串 + 模块类型 直接访问
      const queryFun = 'query_' + this.data.type;
      const res = await ResumeConfig[queryFun](this.data.id);
      this.setData({ query: res[this.data.type] })
    }
    await this.queryList();
  },
  // 根据type查询列表信息 方法定义在配置项里面  根据 字符串 + 模块类型 直接访问
  async queryList() {
    const type = this.data.type;
    if(type === 'education' || type === 'work' || type === 'project'|| type === 'certificate'|| type === 'skill') {
      const queryFun = 'query_list_' + type;
      const res = await ResumeConfig[queryFun]();
      this.setData({ queryList: res[type] })
    }
  },
  async onShow() {
    const theme = app.getTheme();
    this.setData({ theme });
    // 删除 编辑以后 back 重新查询信息
    await this.queryList();
  }
  
})
