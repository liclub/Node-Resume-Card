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
    title: {
      type: 'String',
      value: ''
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    areaList: []
  },
  ready: function () {
    this.setData({ areaList: app.areaList })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onConfirm(event) {
      const address = event.detail.values;
      const value = address[0].name + address[1].name + address[2].name;
      this.triggerEvent('pickerCheck', { value });
    },
  
    onCancel() {
      this.triggerEvent('pickerCancel')
    },
  }
})