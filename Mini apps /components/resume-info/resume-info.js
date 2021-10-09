import WxValidate from '../../utils/WxValidate.js';
import { rules } from '../../common/js/validatorRules'
const { ResumeConfig } = require('../../common/js/resumeConfig');
const smaller  = require('../../utils/getSmallerImg');
const { toBase64 } = require('../../utils/util');

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
    type: { // 模块类型
      type: 'String',
      value: '',
      observer(newVal) {
        // 初始化校验 
        this.WxValidate = new WxValidate(rules[newVal].rule, rules[newVal].message);
      }
    },
    query: { // 当前模块根据id查询出来的信息
      type: 'Object',
      value: {},
      observer(newVal) {
        // 根据当前类型  把查询出来的信息赋值给this.data
        const type = this.data.type; 
        const newValues = app.extend(this.data[type], newVal,true)
        newValues.id = this.data.pid;
        this.setData({ [type]: newValues })
      }
    },
    theme: { // 当前主题
      type: 'String',
      value: ''
    },
    pid: { // 当前信息数据库id
      type: 'String',
      value: ''
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    theme: '', // 当前主题
    themeObj: app.theme, // 主题配置项
    popShow: false, // popup状态
    datePopShow: false, // 时间popup状态
    addressPopShow: false, // 地址popou状态
    pickerTitle: '', // picker标题
    filedPicker: '', // 当前选中picker
    columnsDictionary: ResumeConfig.columnsDictionary, // picker配置项
    pickerColumns: [], // 当前选中picker的列
    basic: ResumeConfig.basic, // 名片展示基本信息
    contact: ResumeConfig.contact, // 联系方式
    self: ResumeConfig.self, // 自我介绍
    education_edit: ResumeConfig.education_edit, // 学历信息
    work_edit: ResumeConfig.work_edit, // 工作经历
    project_edit: ResumeConfig.project_edit, // 项目信息
    skill_edit: ResumeConfig.skill_edit, // 技能等级信息
    certificate_edit: ResumeConfig.certificate_edit, // 证书信息
    head_src: '../../common/images/default.jpg',
    dataIdx: 0,
    current_date: new Date().getTime()
  },
  ready: async function () {
    const type = this.data.type;
    // 简历基本信息根据app。globaldata里面的信息  copy赋值给对应this.data
    if (type === 'contact' || type === 'self' || type ==='basic') {
      const baseInfo = app.globalData.resumeBase;
      if (baseInfo.user_name) {
        this.setData({ 
          [type]: app.extend(this.data[type], app.globalData.resumeBase,true)
        });
      }
      if (baseInfo.head_src) {
        this.setData({ 
          head_src: baseInfo.head_src
        });
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    inputBlur: function (e) { // input失去焦点处理
      const field = e.target.dataset.field
      const target = this.data.type;
      this.data[target][field] = e.detail.value
      this.setData({ [target]: this.data[target] })
    },
    pickerSelect(e) { // picker选中
      // 赋值当前选中的哪一个picker
      const filedPicker = e.target.dataset.field;
      // 获取当前选中picker的配置
      const pickerItem = this.data.columnsDictionary[filedPicker];
      // 根据picker配置项的picktype 看展示哪一个pop
      let showType = 'popShow';
      if(pickerItem.type === 'datePicker') {
        showType = 'datePopShow';
      }else if(pickerItem.type === 'addressPicker') {
        showType = 'addressPopShow'
      }
      this.setData({ 
        pickerColumns: pickerItem.columns, 
        pickerTitle: pickerItem.title,
        [showType]: true,
        filedPicker, 
      })
      // 普通picker 默认
      const defaultVal = this.data[this.data.type][filedPicker];
      if(showType === 'popShow') {
        const dataIdx = this.checkIdx(pickerItem.columns, defaultVal);
        setTimeout(() => {
          this.setData({ dataIdx })
        }, 100);
      }
      // 时间picker默认
      if(showType === 'datePopShow') {
        const current_date = new Date(defaultVal).getTime();
        this.setData({
          current_date
        })
      }
      
    },
    checkIdx(list, val) {
      let idx = 0;
      for (let t in list) {
        if (list[t] === val) {
          idx = t;
          break;
        }
      }
      return parseInt(idx);
    },
    pickerCancel() { // 关闭popup
      this.setData({ 
        popShow: false, 
        datePopShow: false, 
        addressPopShow: false,
        dataIdx: 0
      })
    },
    pickerCheck(e) { // 选中picker里面的哪一个值处理
      const value = e.detail.value; // 选中的值
      const filed = this.data.filedPicker; // 哪一个picker
      const target = this.data.type; // 模块类型
      this.data[target][filed] = value; // 赋值
      this.setData({ [target]: this.data[target] }); // 绑定
      this.pickerCancel(); // 关闭
    },
    async saveResume(event) { // 提交数据库
      new Promise(resolve => {
        setTimeout(() => resolve(this.saveResumeAsync(event)), 300);
      });
    },
    async saveResumeAsync(event){
      // 校验
      if (!this.WxValidate.checkForm(event)) {
        const error = this.WxValidate.errorList[0];
        wx.showToast({ title: error.msg, icon: 'none' })
        return;
      }
      // 根据模块type 获取提交方法 
      const submitName = 'submit_' + this.data.type;
      await ResumeConfig[submitName](this);
      app.navroter.navigateBack();
    },
    chooseImg() { // 选择图片
      const _this = this
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success(imgRes) {
          const temPath = imgRes.tempFilePaths[0];
          smaller.getLessLimitSizeImage('myCanvas', temPath, 0.5, 100, function (res) {
            const promise = toBase64(res)
            promise.then(function (res) {
              _this.uploadImg(res)
            })
          })
        }
      })
    },
    async uploadImg(base64) { // 上传照片
      await wx.API.ResumeApi.uploadHeadSrc({ imgBase64: base64 })
      base64 = 'data:image/jpeg;base64,' + base64
      this.setData({ head_src: base64 })
      app.globalData.resumeBase.head_src = base64;
    },
  }
})