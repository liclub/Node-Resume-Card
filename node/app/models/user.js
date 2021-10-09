// 数据库配置
const { db } = require('../../core/db')
// Sequelize 实例 model实例  sequelize 操作数据库第三方库
const { Sequelize, Model } = require('sequelize')

class User extends Model {

  // 根据open_id获取用户密码
  static async getUserByOpenId(open_id) {
    const user = await User.findOne({
      where: {
        open_id
      }
    })
    return user
  }

  // 根据open_id注册
  static async registerByOpenId(open_id) {
    return await User.create({
      open_id
    })
  }

}

// user数据表实例化
User.init({
  open_id: {
    type: Sequelize.STRING(64),
    comment: "open_id"
  },
  nick_name: {
    type: Sequelize.STRING(256),
    allowNull: true,
    comment: "微信昵称"
  },
  mobile: {
    type: Sequelize.STRING(64),
    allowNull: true,
    comment: "手机号"
  },
  avatar_url: {
    type: Sequelize.STRING(1024),
    allowNull: true,
    comment: "头像地址"
  }
}, {
  sequelize: db,
  tableName: 'resume_user'
});

module.exports = { User }