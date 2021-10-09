let app = getApp();

Component({
  options: {
    addGlobalClass: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    theme: {
      type: 'String',
      value: 'default'
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    themeObj: app.theme.natBtn,
    btnList: [
      {
        url: '../../pages/resume/resume',
        icon: 'icon-jianlibianji',
        name: '编辑简历',
        type: 'link'
      },
      {
        url: '../../pages/qrcodePage/qrcodePage',
        icon: 'icon-xiaochengxuerweima',
        name: '简历二维码',
        type: 'link'
      },
      {
        url: '',
        icon: 'icon-zhuanfafenxiang',
        name: '转发分享',
        type: 'share'
      },
      {
        url: '../../pages/resumePdf/resumePdf',
        icon: 'icon-pdf',
        name: '简历下载',
        type: 'link'
      },
      {
        url: '../../pages/resumeEmail/resumeEmail',
        icon: 'icon-youjian',
        name: '简历发送',
        type: 'link'
      },
      {
        url: '../../pages/theme/theme',
        icon: 'icon-tiaoseban',
        name: '主题',
        type: 'link'
      },
    ]
  },
  ready: function () {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    resumeBtnTap: app.throttle(function(e) {
      const url = e.currentTarget.dataset.link;
      const type = e.currentTarget.dataset.type;
      if (type === 'link') {
        app.navroter.navigateTo({ url })
      }
    })
  }
})