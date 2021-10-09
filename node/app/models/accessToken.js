const { db } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class AccessToken extends Model {
  static async dbAccessToken() {
    return await AccessToken.findOne({ where: { id: 1 } });
  }

  static async updateAccessToken(accessToken, exptime) {
    await AccessToken.update({ accessToken, exptime }, { where: { id: 1 } })
  }

  static async createAccessToken(accessToken, exptime) {
    await AccessToken.create({ accessToken, exptime })
  }

}

// AccessToken数据表实例化
AccessToken.init({
  accessToken: {
    type: Sequelize.STRING(1024),
    allowNull: true,
    comment: "accesstoken"
  },
  exptime: {
    type: Sequelize.STRING(1024),
    allowNull: true,
    comment: "失效时间"
  }
}, {
  sequelize: db,
  tableName: 'resume_access_token'
});

module.exports = { AccessToken }