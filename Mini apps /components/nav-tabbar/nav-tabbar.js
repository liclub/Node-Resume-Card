let app =  getApp();
  
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    theme: {
      type: 'String',
      value: 'default'
    },
    active: {
      type: 'Number',
      value: 0
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    themeObj: app.theme.tabbar,
    link: {
      0 : {
        url: '../../pages/index/index'
      },
      1: {
        url: '../../pages/mine/mine'
      }
    }
  },
  ready: function () {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      const type = event.detail;
      const url = this.data.link[type].url;
      app.navroter.redirectTo({url})
    }
  }
})