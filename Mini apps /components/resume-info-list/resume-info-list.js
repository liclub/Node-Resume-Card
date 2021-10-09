let app =  getApp();
const { ResumeConfig } = require('../../common/js/resumeConfig');

Component({
  options: {
    addGlobalClass: true, // 在组件定义时的选项中启用多slot支持
    multipleSlots: true // 启用插槽
  },
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: 'String',
      value: '',
      observer: function(newval) {
        if (newval === 'education') {
          this.setData({ btnName: '教育经历', editType: 'education_edit' })
        } else if (newval === 'work') {
          this.setData({ btnName: '工作经历', editType: 'work_edit' })
        } else if (newval === 'project') {
          this.setData({ btnName: '项目经历', editType: 'project_edit' })
        } else if (newval === 'skill') {
          this.setData({ btnName: '技能等级', editType: 'skill_edit' })
        } else if (newval === 'certificate') {
          this.setData({ btnName: '资质证书', editType: 'certificate_edit' })
        }
      }
    },
    query_list: {
      type: 'Object',
      value: {},
      observer: function(newVal) {
        const type = this.data.type;
        this.setData({ [type]: newVal })
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
    themeObj: app.theme.simpleBtn,
    sheetShow: false,
    actions: [ { name: '编辑', id: '1' }, { name: '删除', id: '2'} ],
    btnName: '', // 按钮名称
    editType: '', // 模块类型
    education: [], // 学历信息
    work: [], // 工作经验信息
    project: [], // 项目信息
    skill: [], //技能信息
    certificate: [], // 证书信息
    id: '', // 编辑的id
    index: '' // 编辑数组的index
  },
  ready: async function () {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    showSheet(event) {
      this.setData({ 
        sheetShow: true, 
        id: event.currentTarget.dataset.id,
        index: event.currentTarget.dataset.index 
      })
    },
    checkSheet() {
      this.setData({ sheetShow: false })
    },
    async sheetSelect(event) {
      const btnId = event.detail.btnId;
      if (btnId === '1') { // 编辑
        app.navroter.navigateTo({ url: '/pages/baseInfo/baseInfo?type=' + this.data.editType + '&id=' + this.data.id })
      } else if (btnId === '2') { // 删除
        app.Toast('确定删除吗？', this, async ()=> {
          const funcName = 'delete_' + this.data.type;
          await ResumeConfig[funcName](this.data.id);
          let deepClone = JSON.parse(JSON.stringify(this.data[this.data.type]))
          deepClone.splice(this.data.index, 1);
          this.setData({[this.data.type]: deepClone})
        })
      }
      this.setData({ sheetShow: false })
    },
    addEducation() {
      app.navroter.navigateTo({url: '/pages/baseInfo/baseInfo?type=' + this.data.editType})
    }
  }
})