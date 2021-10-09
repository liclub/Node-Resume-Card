let app =  getApp();
  
Component({
  options: {
    addGlobalClass: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    resume_base: {
      type: 'Object',
      value: {},
      observer(newVal) {
        const head_src = newVal.head_src;
        if (head_src) {
          this.setData({ head_src });
        }
      }
    },
    theme: {
      type: 'String',
      value: 'default'
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    themeObj: app.theme.card,
    head_src: '../../common/images/default.jpg'
  },
  ready: function () {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})