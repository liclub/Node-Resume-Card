
// 数据库配置
const { db } = require('../../core/db')
// Sequelize 实例 model实例  sequelize 操作数据库第三方库
const { Sequelize, Model } = require('sequelize')

class ResumeSafe extends Model {

  static async saveSafeConfig(open_id, safe) {
    const config = await ResumeSafe.findOne({
      where: {
        open_id
      }
    })
    if (config) {
      await ResumeSafe.update(safe,{
        where: {
          open_id
        }
      })
    }else {
      safe.open_id = open_id;
      await ResumeSafe.create(safe);
    }
  }

}

// ResumeSafe数据表实例化
ResumeSafe.init({
  password: {
    type: Sequelize.STRING(2000),
    allowNull: true,
    comment: "密码"
  },
  open_id: {
    type: Sequelize.STRING(64),
    allowNull: true,
    comment: "openid"
  },
  share: {
    type: Sequelize.STRING(64),
    allowNull: true,
    comment: "是否允许转发"
  },
  collection: {
    type: Sequelize.STRING(64),
    allowNull: true,
    comment: "是否允许收藏"
  }
}, {
  sequelize: db,
  tableName: 'resume_safe'
});

module.exports = { ResumeSafe }