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
    editType: {
      type: 'String',
      value: ''
    },
    title: {
      type: 'String',
      value: ''
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
    themeObj: app.theme.resumeHeader,
    slotShow: true
  },
  ready: function () {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    showSheet(e) {
      this.triggerEvent('preSheet', { editType: this.data.editType })
    },
    slotMode() {
      const slotShow = !this.data.slotShow;
      this.setData({ slotShow })
    }
  }
})