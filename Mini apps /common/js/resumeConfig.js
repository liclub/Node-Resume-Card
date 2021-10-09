
const ResumeConfig = {
  catchType: {
    'basic': 'resumeBase',
    'contact': 'resumeBase',
    'self': 'resumeBase',
    'education_edit': 'resumeEducation',
    'work_edit': 'resumeWork',
    'project_edit': 'resumeProject',
    'skill_edit': 'resumeSkill',
    'certificate_edit': 'resumeCertificate'
  },
  typeActions: [ // 模块sheet
    {
      name: '编辑',
      id: '1'
    }
  ],
  linkType: {// 模块跳转类型
    '1': 'basic',
    '2': 'contact',
    '3': 'self',
    '4': 'education',
    '5': 'work',
    '6': 'project',
    '7': 'skill',
    '8': 'certificate'
  },
  // 简历页面标题介绍配置
  describe:{
    basic: {
      itemTitle: '基本信息',
      title: '编辑基本信息',
      des:'请填写您的个人基本信息，请确保信息的完整和准确，分享时这部分信息会展示在分享的卡片中。'
    },
    contact: {
      itemTitle: '联系方式',
      title: '编辑联系方式',
      des:'至少填写一种联系方式，便于招聘人员联系到您。'
    },
    self: {
      itemTitle: '自我评价',
      title: '编辑自我评价',
      des:'自我评价不只是自己至今职业生涯的一个概括，更要突显自己的职业目标，是自我推荐的重要部分。'
    },
    education: {
      itemTitle: '教育经历',
      title: '教育经历',
      des:'请填写您的教育经历，保存后会按照时间倒叙展示，最后的教育经历会显示在第一个。'
    },
    project: {
      itemTitle: '项目经验',
      title: '项目经验',
      des:'请填写您的项目经验,保存后会按照时间倒叙展示，最后的项目经验会显示在第一个。'
    },
    certificate: {
      itemTitle: '资质证书',
      title: '资质证书',
      des:'请填写您所拥有的资质或者证书，证明您可以从事哪些行业或具有哪些技能优势，比如计算机等级二级证书等。'
    },
    skill: {
      itemTitle: '技能等级',
      title: '技能等级',
      des:'真实的展示个人的技能等级，使人对你又一个更直观的认识。'
    },
    work: {
      itemTitle: '工作经历',
      title: '工作经历',
      des:'请填写您的工作经历，保存后会按照时间倒叙展示，最后的工作经历会展示在第一个。'
    },
    education_edit: {
      itemTitle: '教育经历',
      title: '编辑教育经历',
      des:'请填写您的教育经历，保存后会按照时间倒叙展示，最后的教育经历会显示在第一个。'
    },
    project_edit: {
      itemTitle: '项目经验',
      title: '编辑项目经验',
      des:'请填写您的项目经验,保存后会按照时间倒叙展示，最后的项目经验会显示在第一个。'
    },
    work_edit: {
      itemTitle: '工作经历',
      title: '编辑工作经历',
      des:'请填写您的工作经历，保存后会按照时间倒叙展示，最后的工作经历会展示在第一个。'
    },
    skill_edit: {
      itemTitle: '技能等级',
      title: '编辑技能等级',
      des:'真实的展示个人的技能等级，使人对你又一个更直观的认识。'
    },
    certificate_edit: {
      itemTitle: '资质证书',
      title: '编辑资质证书',
      des:'请填写您所拥有的资质或者证书，证明您可以从事哪些行业或具有哪些技能优势，比如计算机等级二级证书等。'
    },
  },
  // picker配置项
  columnsDictionary: {
    sex: {
      columns: ['男', '女'],
      title: '性别',
      type: 'picker',
    },
    education: {
      columns: ['博士','硕士','本科','大专','中专','高中','初中','小学','无'],
      title: '学历',
      type: 'picker'
    },
    work_years: {
      columns: (function(){
        let years = ['无'];
        for (let t = 1; t < 100; t++) {
          years.push(t + '年')
        }
        return years
      })(),
      title: '工作年限',
      type: 'picker'
    },
    birthday: {
      type: 'datePicker',
      title: '出生日期',
      columns: []
    },
    city: {
      type: 'addressPicker',
      title: '所在城市',
      columns: []
    },
    job_status: {
      columns: ['目前正在找工作,已离职','目前正在找工作,未离职','目前在职,不需要找工作'],
      title: '学历',
      type: 'picker'
    },
    graduation_at: {
      type: 'datePicker',
      title: '毕业时间',
      columns: []
    },
    entry_at: {
      type: 'datePicker',
      title: '入职时间',
      columns: []
    },
    leave_at: {
      type: 'datePicker',
      title: '离职时间',
      columns: []
    },
    begin_at: {
      type: 'datePicker',
      title: '项目开始时间',
      columns: []
    },
    end_at: {
      type: 'datePicker',
      title: '项目结束时间',
      columns: []
    },
    skill_level: {
      columns: ['一般','熟练','良好','精通','专家'],
      title: '学历',
      type: 'picker'
    },
    certificate_at: {
      type: 'datePicker',
      title: '证书获取时间',
      columns: []
    }
  },
  basic: { // 名片展示基本信息
    user_name: '',
    job: '',
    sex: '',
    age: '',
    work_years: '',
    birthday: '',
    city: '',
    job_status: '',
    education: ''
  },
  contact: { // 联系方式
    mobile: '', 
    email: '',
    wechat: '',
    qq: '',
    weibo: ''
  },
  self: { // 自我介绍
    introduce: ''
  },
  education_edit: { // 学历信息
    colleges: '',
    major: '',
    education: '',
    graduation_at: '',
    id: ''
  },
  work_edit: { // 工作经历
    company_name: '',
    job: '',
    entry_at: '',
    leave_at: '至今',
    job_content: ''
  },
  project_edit: { // 项目信息
    project_name: '',
    link_url: '',
    job: '',
    begin_at: '',
    end_at: '至今',
    project_content: ''
  },
  skill_edit: { // 技能信息
    skill_name: '',
    skill_level: ''
  },
  certificate_edit: { // 证书信息
    certificate_name: '',
    certificate_at: ''
  },
  // 基本信息提交数据库
  async baseCommonSubmit(that) {
    let app =  getApp();
    await wx.API.ResumeApi.updateResume(that.data[that.data.type]);
    app.globalData.resumeBase = Object.assign({} ,app.globalData.resumeBase, that.data[that.data.type]);
  },
  // 简历card展示信息提交数据库
  async submit_basic(that) {
    this.baseCommonSubmit(that);
  },
  // 联系方式提交数据库
  async submit_contact(that) {
    this.baseCommonSubmit(that);
  },
  // 自我介绍提交数据库
  async submit_self(that) {
    this.baseCommonSubmit(that);
  },
  // 学历信息提交数据库
  async submit_education_edit(that) {
    await wx.API.ResumeApi.addResumeEducation(that.data[that.data.type])
  },
  // 工作经历提交数据库
  async submit_work_edit(that) {
    await wx.API.ResumeApi.addResumeWork(that.data[that.data.type])
  },
  // 项目信息提交数据库
  async submit_project_edit(that) {
    await wx.API.ResumeApi.addResumeProject(that.data[that.data.type])
  },
  // 技能提交数据库
  async submit_skill_edit(that) {
    await wx.API.ResumeApi.addResumeSkill(that.data[that.data.type])
  },
  // 证书提交数据库
  async submit_certificate_edit(that) {
    await wx.API.ResumeApi.addResumeCertificate(that.data[that.data.type])
  },
  // 根据id查询学历详细信息
  async query_education_edit(id) {
    return await wx.API.ResumeApi.getResumeEducationById({id});
  },
  // 根据id查找工作经历详细信息
  async query_work_edit(id) {
    return await wx.API.ResumeApi.getResumeWorkById({id});
  },
  // 根据id查找项目详细信息
  async query_project_edit(id) {
    return await wx.API.ResumeApi.getResumeProjectById({id});
  },
  // 根据id查找技能详细信息
  async query_skill_edit(id) {
    return await wx.API.ResumeApi.getResumeSkillById({id});
  },
  // 根据id查找证书详细信息
  async query_certificate_edit(id) {
    return await wx.API.ResumeApi.getResumeCertificateById({id});
  },
  // 查询学历列表
  async query_list_education() {
    return await wx.API.ResumeApi.getResumeEducation();
  },
  // 查询工作信息列表
  async query_list_work() {
    return await wx.API.ResumeApi.getResumeWork();
  },
  // 查询项目信息列表
  async query_list_project() {
    return await wx.API.ResumeApi.getResumeProject();
  },
  // 查询技能信息列表
  async query_list_skill() {
    return await wx.API.ResumeApi.getResumeSkill();
  },
  // 查询证书信息列表
  async query_list_certificate() {
    return await wx.API.ResumeApi.getResumeCertificate();
  },
  // 删除学历
  async delete_education(id) {
    await wx.API.ResumeApi.removeResumeEducation({ id });
  },
  // 删除工作经历
  async delete_work(id) {
    await wx.API.ResumeApi.removeResumeWork({ id });
  },
  // 删除项目经验
  async delete_project(id) {
    await wx.API.ResumeApi.removeResumeProject({ id });
  },
  // 删除技能
  async delete_skill(id) {
    await wx.API.ResumeApi.removeResumeSkill({ id });
  },
  // 删除证书
  async delete_certificate(id) {
    await wx.API.ResumeApi.removeResumeCertificate({ id });
  }
}

module.exports = {
  ResumeConfig
}