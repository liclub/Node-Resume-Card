// 数据库配置
const { db } = require('../../core/db')
// Sequelize 实例 model实例  sequelize 操作数据库第三方库
const { Sequelize, Model } = require('sequelize')

class ResumeSkill extends Model {
  static async getByOpenId(open_id) {
    return await ResumeSkill.findAll({
      attributes: { exclude: ['open_id'] },
      where: {
        open_id,
        state: '1'
      }
    })
  }

  static async getSkillById(open_id, id) {
    return await ResumeSkill.findOne({
      attributes: { exclude: ['id', 'open_id'] },
      where: {
        open_id,
        id,
        state: '1'
      }
    })
  }

  static async addResumeSkill(skill, open_id) {
    skill.open_id = open_id;
    skill.state = '1';
    await ResumeSkill.create(skill);
  }

  static async updateResumeSkill(skill, id, open_id) {
    await ResumeSkill.update(skill, {
      where: {
        id, open_id
      }
    })
  }

  static async deleteResumeSkill(id, open_id) {
    await ResumeSkill.update({ state: '0' }, {
      where: {
        id, open_id
      }
    });
  }
}

// ResumeSkill数据表实例化
ResumeSkill.init({
  open_id: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: "用户openid"
  },
  skill_name: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "技能名称"
  },
  skill_level: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "技能熟练度"
  },
  state: {
    type: Sequelize.STRING(64),
    allowNull: true,
    comment: "状态 1是 0 否"
  },
}, {
  sequelize: db,
  tableName: 'resume_skill'
});

module.exports = { ResumeSkill }