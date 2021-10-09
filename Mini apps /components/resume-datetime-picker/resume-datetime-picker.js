let app =  getApp();
const { getMyDate } = require('../../utils/util');

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
    current_date: {
      type: 'Number',
      value: new Date().getTime()
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } 
      if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
  },
  ready: function () {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onConfirm(event) {
      const value  = getMyDate(event.detail);
      this.triggerEvent('pickerCheck', { value })
    },
  
    onCancel() {
      this.triggerEvent('pickerCancel')
    },
  }
})