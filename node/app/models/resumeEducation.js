// 数据库配置
const { db } = require('../../core/db')
// Sequelize 实例 model实例  sequelize 操作数据库第三方库
const { Sequelize, Model } = require('sequelize')

class ResumeEducation extends Model {
  static async getByOpenId(open_id) {
    return await ResumeEducation.findAll({
      attributes: { exclude: ['open_id'] },
      where: {
        open_id,
        state: '1'
      },
      order: [
        ['graduation_at', 'DESC']
      ]
    })
  }

  static async addResumeEducation(education, open_id) {
    education.open_id = open_id;
    education.state = '1';
    await ResumeEducation.create(education);
  }

  static async updateResumeEducation(education, id, open_id) {
    await ResumeEducation.update(education, {
      where: {
        id, open_id
      }
    })
  }

  static async deleteResumeEducation(id, open_id) {
    await ResumeEducation.update({ state: '0' }, {
      where: {
        id, open_id
      }
    });
  }

  static async getEducationById(open_id, id) {
    return await ResumeEducation.findOne({
      attributes: { exclude: ['id', 'open_id'] },
      where: {
        open_id,
        id,
        state: '1'
      }
    })
  }


}

// ResumeBase数据表实例化
ResumeEducation.init({
  open_id: {
    type: Sequelize.STRING(255),
    allowNull: false,
    comment: "openid"
  },
  colleges: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "大学"
  },
  major: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "专业"
  },
  education: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "学历"
  },
  graduation_at: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "毕业时间"
  },
  state: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "状态"
  }
}, {
  sequelize: db,
  tableName: 'resume_education'
});

module.exports = { ResumeEducation }