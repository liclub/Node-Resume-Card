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
    columns: {
      type: 'Object',
      value: []
    },
    title: {
      type: 'String',
      value: ''
    },
    data_idx: {
      type: 'Number',
      value: 0
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
    onConfirm(event) {
      const { value } = event.detail;
      this.triggerEvent('pickerCheck', { value })
    },
  
    onCancel() {
      this.triggerEvent('pickerCancel', {})
    },
  }
})