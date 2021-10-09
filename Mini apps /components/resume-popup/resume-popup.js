let app =  getApp();
  
Component({
  options: {
    addGlobalClass: true, // 在组件定义时的选项中启用多slot支持
    multipleSlots: true // 启用插槽
  },
  /**
   * 组件的属性列表
   */
  properties: {
    pop_show: {
      type: 'Boolean',
      value: false
    },
    custom_style: {
      type: 'String',
      value: 'height:50%'
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
  },
  ready: function () {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    closePopup() {
      this.triggerEvent('pickerCancel', {})
    }
  }
})