import { Http } from '../utils/http'
  
class Resume extends Http {

  constructor() {
    super();
    this.prefix = '/v1/resume';
    this.headPrefix = '/v1/upload'
  }

  // 上传头像
  async uploadHeadSrc(params) {
    return await this.request(this.headPrefix + '/img', 'POST', params)
  }

  // 获取简历所有信息
  async findResume(params) {
    return await this.request(this.prefix + '/get', 'POST', params, true, false);
  }

  // 获取简历基本信息
  async findResumeBase () {
    return await this.request(this.prefix + '/base', 'GET', null)
  }
  
  // 更新简历基本信息信息
  async updateResume (params) {
    return await this.request(this.prefix + '/base/update', 'POST', params)
  }

  // 获取简历教育信息列表
  async getResumeEducation() {
    return await this.request(this.prefix + '/education', 'GET', null, true, false)
  }

  // 获取简历教育信息根据id
  async getResumeEducationById(params) {
    return await this.request(this.prefix + '/education/id', 'POST', params)
  }

  // 新增简历教育信息
  async addResumeEducation(params) {
    return await this.request(this.prefix + '/education/add', 'POST', params)
  }
  // 删除简历教育信息
  async removeResumeEducation(params) {
    return await this.request(this.prefix + '/education/delete', 'POST', params)
  }

  // 获取简历工作经历列表
  async getResumeWork() {
    return await this.request(this.prefix + '/work', 'GET', null, true, false)
  }

  // 获取简历工作经历根据id
  async getResumeWorkById(params) {
    return await this.request(this.prefix + '/work/id', 'POST', params)
  }

  // 新增简历工作经历
  async addResumeWork(params) {
    return await this.request(this.prefix + '/work/add', 'POST', params)
  }
  // 删除简历工作经历
  async removeResumeWork(params) {
    return await this.request(this.prefix + '/work/delete', 'POST', params)
  }


  // 获取简历项目信息列表
  async getResumeProject() {
    return await this.request(this.prefix + '/project', 'GET', null, true, false)
  }

  // 获取简历项目信息根据id
  async getResumeProjectById(params) {
    return await this.request(this.prefix + '/project/id', 'POST', params)
  }

  // 新增简历项目信息
  async addResumeProject(params) {
    return await this.request(this.prefix + '/project/add', 'POST', params)
  }
  // 删除简历项目信息
  async removeResumeProject(params) {
    return await this.request(this.prefix + '/project/delete', 'POST', params)
  }


  // 获取简历技能列表
  async getResumeSkill() {
    return await this.request(this.prefix + '/skill', 'GET', null, true, false)
  }

  // 获取简历技能根据id
  async getResumeSkillById(params) {
    return await this.request(this.prefix + '/skill/id', 'POST', params)
  }

  // 新增简历技能
  async addResumeSkill(params) {
    return await this.request(this.prefix + '/skill/add', 'POST', params)
  }
  // 删除简历技能
  async removeResumeSkill(params) {
    return await this.request(this.prefix + '/skill/delete', 'POST', params)
  }


  // 获取简历证书列表
  async getResumeCertificate() {
    return await this.request(this.prefix + '/certificate', 'GET', null, true, false)
  }

  // 获取简历证书根据id
  async getResumeCertificateById(params) {
    return await this.request(this.prefix + '/certificate/id', 'POST', params)
  }

  // 新增简历证书
  async addResumeCertificate(params) {
    return await this.request(this.prefix + '/certificate/add', 'POST', params)
  }
  // 删除简历证书
  async removeResumeCertificate(params) {
    return await this.request(this.prefix + '/certificate/delete', 'POST', params)
  }
}

export  { Resume }