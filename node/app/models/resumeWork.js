// 数据库配置
const { db } = require('../../core/db')
// Sequelize 实例 model实例  sequelize 操作数据库第三方库
const { Sequelize, Model } = require('sequelize')

class ResumeWork extends Model {
  static async getByOpenId(open_id) {
    return await ResumeWork.findAll({
      attributes: { exclude: ['open_id'] },
      where: {
        open_id,
        state: '1'
      },
      order: [
        ['leave_at', 'DESC']
      ]
    })
  }

  static async getWorkById(open_id, id) {
    return await ResumeWork.findOne({
      attributes: { exclude: ['id', 'open_id'] },
      where: {
        open_id,
        id,
        state: '1'
      }
    })
  }

  static async addResumeWork(work, open_id) {
    work.open_id = open_id;
    work.state = '1';
    await ResumeWork.create(work);
  }

  static async updateResumeWork(work, id, open_id) {
    await ResumeWork.update(work, {
      where: {
        id, open_id
      }
    })
  }

  static async deleteResumeWork(id, open_id) {
    await ResumeWork.update({ state: '0' }, {
      where: {
        id, open_id
      }
    });
  }
}

// ResumeWork数据表实例化
ResumeWork.init({
  open_id: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: "用户openid"
  },
  company_name: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "公司"
  },
  job: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "职位"
  },
  entry_at: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "入职时间"
  },
  leave_at: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "离职时间"
  },
  job_content: {
    type: Sequelize.STRING(2550),
    allowNull: true,
    comment: "工作内容"
  },
  state: {
    type: Sequelize.STRING(64),
    allowNull: true,
    comment: "状态 1是 0 否"
  }
}, {
  sequelize: db,
  tableName: 'resume_work'
});

module.exports = { ResumeWork }