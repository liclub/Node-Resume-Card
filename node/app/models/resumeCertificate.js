// 数据库配置
const { db } = require('../../core/db')
// Sequelize 实例 model实例  sequelize 操作数据库第三方库
const { Sequelize, Model } = require('sequelize')

class ResumeCertificate extends Model {
  static async getByOpenId(open_id) {
    return await ResumeCertificate.findAll({
      attributes: { exclude: ['open_id'] },
      where: {
        open_id,
        state: '1'
      },
      order: [
        ['certificate_at', 'DESC']
      ]
    })
  }

  static async getCertificateById(open_id, id) {
    return await ResumeCertificate.findOne({
      attributes: { exclude: ['id', 'open_id'] },
      where: {
        open_id,
        id,
        state: '1'
      }
    })
  }
  
  static async addResumeCertificate(certificate, open_id) {
    certificate.open_id = open_id;
    certificate.state = '1';
    await ResumeCertificate.create(certificate);
  }

  static async updateResumeCertificate(certificate, id, open_id) {
    await ResumeCertificate.update(certificate, {
      where: {
        id, open_id
      }
    })
  }

  static async deleteResumeCertificate(id, open_id) {
    await ResumeCertificate.update({ state: '0' }, {
      where: {
        id, open_id
      }
    });
  }
}

// ResumeCertificate数据表实例化
ResumeCertificate.init({
  open_id: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: "用户openid"
  },
  certificate_name: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "证书名称"
  },
  certificate_at: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "获取时间"
  },
  state: {
    type: Sequelize.STRING(64),
    allowNull: true,
    comment: "状态 1是 0 否"
  }
}, {
  sequelize: db,
  tableName: 'resume_certificate'
});

module.exports = { ResumeCertificate }