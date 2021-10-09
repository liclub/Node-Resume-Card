// 数据库配置
const { db } = require('../../core/db')
// Sequelize 实例 model实例  sequelize 操作数据库第三方库
const { Sequelize, Model } = require('sequelize')

class ResumeBase extends Model {
  
  static async getByOpenId(open_id) {
    return await ResumeBase.findOne({
      attributes: { exclude: ['id', 'open_id'] },
      where: {
        open_id
      }
    })
  }

  // 更新简历基本信息
  static async updateBaseInfo(baseInfo,open_id) {
    return await ResumeBase.update(baseInfo,{
      where: {
        open_id
      }
    });
  }

  static async createBaseInfo(baseInfo,open_id) {
    baseInfo.open_id = open_id;
    return await ResumeBase.create(baseInfo);
  }

}

// ResumeBase数据表实例化
ResumeBase.init({
  open_id: {
    type: Sequelize.STRING(255),
    allowNull: false,
    comment: "openid"
  },
  user_name: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "姓名"
  },
  job: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "职位"
  },
  head_src: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "上传头像地址"
  },
  sex: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "性别"
  },
  age: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "年龄"
  },
  work_years: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "工龄"
  },
  birthday: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "出生日期"
  },
  city: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "城市"
  },
  mobile: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "手机"
  },
  email: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "邮箱"
  },
  wechat: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "微信"
  },
  qq: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "qq"
  },
  weibo: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "微博"
  },
  introduce: {
    type: Sequelize.STRING(2550),
    allowNull: true,
    comment: "自我介绍"
  },
  job_status: {
    type: Sequelize.STRING(64),
    allowNull: true,
    comment: "目前人员状态"
  },
  education: {
    type: Sequelize.STRING(64),
    allowNull: true,
    comment: "学历"
  }
}, {
  sequelize: db,
  tableName: 'resume_base'
});

module.exports = { ResumeBase }