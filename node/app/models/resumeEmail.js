
// 数据库配置
const { db } = require('../../core/db')
// Sequelize 实例 model实例  sequelize 操作数据库第三方库
const { Sequelize, Model } = require('sequelize')

class ResumeEmail extends Model {

  static async createEmailLog(email) {
    await ResumeEmail.create(email);
  }

}

// ResumeEmail数据表实例化
ResumeEmail.init({
  open_id: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: "微信openid"
  },
  tpl_type: {
    type: Sequelize.STRING(64),
    allowNull: true,
    comment: "模板类型"
  },
  result_json: {
    type: Sequelize.STRING(2000),
    allowNull: true,
    comment: "返回结果"
  }
}, {
  sequelize: db,
  tableName: 'resume_email'
});

module.exports = { ResumeEmail }