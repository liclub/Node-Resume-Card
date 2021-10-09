
// 数据库配置
const { db } = require('../../core/db')
// Sequelize 实例 model实例  sequelize 操作数据库第三方库
const { Sequelize, Model } = require('sequelize')

class ResumeMessage extends Model {
  static async getSystemMsg() {
    return await ResumeMessage.findAll({
      attributes: {
        include: [
          [Sequelize.fn('date_format', Sequelize.col('created_at'), '%Y-%m-%d %H:%i:%s'), 'created_at'],
          [Sequelize.fn('date_format', Sequelize.col('updated_at'), '%Y-%m-%d %H:%i:%s'), 'updated_at'],
        ]
      },
      where: {
        type: '1'
      },
      order: [
        ['created_at', 'DESC']
      ]
    })
  }

}

// ResumeMessage数据表实例化
ResumeMessage.init({
  message: {
    type: Sequelize.STRING(2000),
    allowNull: true,
    comment: "消息"
  },
  type: {
    type: Sequelize.STRING(64),
    allowNull: true,
    comment: "消息类型 1系统消息 2 个人消息"
  },
  receive_open_id: {
    type: Sequelize.STRING(64),
    allowNull: true,
    comment: "接收者的openid"
  },
  send_open_id: {
    type: Sequelize.STRING(64),
    allowNull: true,
    comment: "发送者的openid"
  }
}, {
  sequelize: db,
  tableName: 'resume_message'
});

module.exports = { ResumeMessage }