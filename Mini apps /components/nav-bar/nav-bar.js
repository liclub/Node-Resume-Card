let app =  getApp();
  
Component({
  styleIsolation: 'shared',
  /**
   * 组件的属性列表
   */
  properties: {
    navTitle: {
      type: 'String',
      value: '简历名片夹'
    },
    left_arrow: {
      type: 'Boolean',
      value: false
    },
    theme: {
      type: 'String',
      value: 'default'
    },
    share_id: {
      type: 'String',
      value: ''
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    placeholder: true,
    themeObj: app.theme.nav,
    border: false
  },
  ready: function () {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onClickLeft: app.throttle(function() {
      if(this.data.share_id) {
        app.navroter.redirectTo({url: '../../pages/index/index'})
      }
      app.navroter.navigateBack({})
    })
  }
})