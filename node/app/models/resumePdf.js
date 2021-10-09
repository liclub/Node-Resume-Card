
// 数据库配置
const { db } = require('../../core/db')
// Sequelize 实例 model实例  sequelize 操作数据库第三方库
const { Sequelize, Model } = require('sequelize')

class ResumePdf extends Model {
  static async createResumePdf(resume_pdf) {
    await ResumePdf.create(resume_pdf);
  }
  static async getPdf(open_id, tpl_type) {
    return await ResumePdf.findOne({
      where: {
        open_id, tpl_type
      }
    })
  }

  static async updatePdf(id, pdf) {
    await ResumePdf.update(pdf, {
      where: {
        id
      }
    })
  }

  static async getResumePdf(open_id) {
   return await ResumePdf.findAll({
     attributes: { exclude: ['open_id', 'pdf_path'] },
     where: {
      open_id
     },
     order: [
      ['updated_at', 'DESC']
    ]
   })
  }

}


// ResumePdf数据表实例化
ResumePdf.init({
  open_id: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: "微信openid"
  },
  pdf_path: {
    type: Sequelize.STRING(256),
    allowNull: true,
    comment: "pdf路径"
  },
  pdf_link: {
    type: Sequelize.STRING(256),
    allowNull: true,
    comment: "pdf对外暴露路径"
  },
  tpl_type: {
    type: Sequelize.STRING(64),
    allowNull: true,
    comment: "模板类型"
  },
  state: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "状态 1是0否"
  }
}, {
  sequelize: db,
  tableName: 'resume_pdf'
});

module.exports = { ResumePdf }