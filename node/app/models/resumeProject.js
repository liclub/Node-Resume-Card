// 数据库配置
const { db } = require('../../core/db')
// Sequelize 实例 model实例  sequelize 操作数据库第三方库
const { Sequelize, Model } = require('sequelize')

class ResumeProject extends Model {
  static async getByOpenId(open_id) {
    return await ResumeProject.findAll({
      attributes: { exclude: ['open_id'] },
      where: {
        open_id,
        state: '1'
      },
      order: [
        ['end_at', 'DESC']
      ]
    })
  }

  static async getProjectById(open_id, id) {
    return await ResumeProject.findOne({
      attributes: { exclude: ['id', 'open_id'] },
      where: {
        open_id,
        id,
        state: '1'
      }
    })
  }

  static async addResumeProject(project, open_id) {
    project.open_id = open_id;
    project.state = '1';
    await ResumeProject.create(project);
  }

  static async updateResumeProject(project, id, open_id) {
    await ResumeProject.update(project, {
      where: {
        id, open_id
      }
    })
  }

  static async deleteResumeProject(id, open_id) {
    await ResumeProject.update({ state: '0' }, {
      where: {
        id, open_id
      }
    });
  }
}

// ResumeProject数据表实例化
ResumeProject.init({
  open_id: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: "用户openid"
  },
  project_name: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "项目名称"
  },
  link_url: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "项目地址"
  },
  job: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "职责"
  },
  begin_at: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "项目开始时间"
  },
  end_at: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "项目结束时间"
  },
  project_content: {
    type: Sequelize.STRING(2550),
    allowNull: true,
    comment: "项目成功"
  },
  state: {
    type: Sequelize.STRING(64),
    allowNull: true,
    comment: "状态 1是 0 否"
  }
}, {
  sequelize: db,
  tableName: 'resume_project'
});

module.exports = { ResumeProject }