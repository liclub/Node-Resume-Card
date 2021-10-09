const fs = require("fs")
const mime = require('mime-types'); //需npm安装

// 数据库配置
const { db } = require('../../core/db')
// Sequelize 实例 model实例  sequelize 操作数据库第三方库
const { Sequelize, Model } = require('sequelize')
const { ResumeBase } = require('../models/resumeBase');
const { ResumeEducation } = require('../models/resumeEducation');
const { ResumeWork } = require('../models/resumeWork');
const { ResumeProject } = require('../models/resumeProject');
const { ResumeSkill } = require('../models/resumeSkill');
const { ResumeCertificate } = require('../models/resumeCertificate');
let resumeBase = {
  open_id: '',
  user_name: '大牛',
  job: '软件开发工程师',
  head_src: '',
  sex: '男',
  age: '28',
  work_years: '5年',
  birthday: '1994-02-06',
  city: '上海市浦东新区',
  mobile: '1888888****',
  email: '***@163.com',
  introduce: '忠实守信，讲原则，绝不推卸责任；有自制力，做事有始有终，从不半途而废；肯学习，有问题不逃避，愿意虚心向他人学习。',
  job_status: '目前正在找工作,已离职',
  education: '本科'
}
let resumeEducation = {
  open_id: '',
  colleges: '清华大学',
  major: '计算机科学与技术',
  education: '硕士',
  graduation_at: '2016-07-01',
  state: '1'
}

let resumeWork = {
  open_id: '',
  company_name: '阿里',
  job: '高级前端开发工程师',
  entry_at: '2012-03-09',
  leave_at: '2019-02-12',
  job_content: '1.与设计师和后台程序配合，高效率高质量的完成工作。2.任前端开发小组长，带领团队高效完成工作。',
  state: '1'
}

let resumeProject = {
  project_name: '公司网站',
  link_url: '',
  job: '前端开发工程师',
  begin_at: '2014-03-21',
  end_at: '2015-09-12',
  project_content: '公司门户网站，实现对外宣传同时，实现部分CRM功能，用户注册，在线提需求，由公司内部对接。',
  state: '1'
}

let resumeSkill = {
  open_id: '',
  skill_name: '英语',
  skill_level: '熟练',
  state: '1'
}

let resumeCertificate = {
  open_id: '',
  certificate_name: '计算机二级证书',
  certificate_at: '2012-03-12',
  state: '1'
}

class Resume extends Model {

  //简历初始化
  static async initResume(open_id, resume) {
    if (!resume) {
      ResumeBase.createBaseInfo(resumeBase, open_id);
      ResumeEducation.addResumeEducation(resumeEducation, open_id);
      ResumeWork.addResumeWork(resumeWork,open_id);
      ResumeProject.addResumeProject(resumeProject, open_id);
      ResumeSkill.addResumeSkill(resumeSkill, open_id);
      ResumeCertificate.addResumeCertificate(resumeCertificate, open_id);
    }
  }

  // 根据open_id获取用户密码
  static async getResumeByOpenId(open_id) {
    const resume = await Resume.findOne({
      where: {
        open_id
      }
    })
    return resume
  }

  static async registerResume(open_id) {
    return await Resume.create({
      open_id
    })
  }

  static async getResumeInfo(open_id) {
    const resumeBase = await ResumeBase.getByOpenId(open_id);
    const education = await ResumeEducation.getByOpenId(open_id);
    const work = await ResumeWork.getByOpenId(open_id);
    const project = await ResumeProject.getByOpenId(open_id);
    const skill = await ResumeSkill.getByOpenId(open_id);
    const certificate = await ResumeCertificate.getByOpenId(open_id);
    // 获取头像地址
    if (resumeBase && resumeBase.head_src) {
      const base64 = this.getHeadBase64(resumeBase.head_src);
      resumeBase.head_src = base64;
    }
    return {
      resumeBase,
      education,
      work,
      project,
      skill,
      certificate,
    }
  }


 static getHeadBase64(head_src) {
  const headPath = global.config.cardHeadSrc;
  const filePath = headPath + head_src; //图片地址
  let file = null;
  try {
    file = fs.readFileSync(filePath); //读取文件
  } catch (error) {
    //如果服务器不存在请求的图片，返回默认图片
    file = fs.readFileSync(headPath + 'default.png'); //读取文件	    
  }

  const bufferData = Buffer.from(file).toString("base64");
  const base64 = "data:" + mime.lookup(filePath) + ";base64," + bufferData;
  return base64;
}

}


// Resume数据表实例化
Resume.init({
  open_id: {
    type: Sequelize.STRING(64),
    comment: "open_id"
  }
}, {
  sequelize: db,
  tableName: 'resume'
});

module.exports = { Resume }