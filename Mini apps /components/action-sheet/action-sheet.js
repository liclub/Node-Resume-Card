let app = getApp();

Component({
  styleIsolation: 'shared',
  addGlobalClass: true, // 在组件定义时的选项中启用多slot支持
  multipleSlots: true, // 启用插槽
  /**
   * 组件的属性列表
   */
  properties: {
    sheet_show: {
      type: 'Boolean',
      value: false
    },
    actions: {
      type: 'Object',
      value: [],
      observe(newval) {
        this.setData({ actions: newval })
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    sheet_show: true,
  },
  ready: function () {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    sheetCancel() {
      this.setData({ sheet_show: false });
      this.triggerEvent('checkSheet', {})
    },

    sheetSelect(event) {
      const btnId = event.detail.id;
      this.triggerEvent('sheetSelect', { btnId })
    }
  }
})