const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('resume_pdf', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    open_id: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "微信openid"
    },
    pdf_path: {
      type: DataTypes.STRING(256),
      allowNull: true,
      comment: "pdf路径"
    },
    pdf_link: {
      type: DataTypes.STRING(256),
      allowNull: true,
      comment: "pdf对外暴露路径"
    },
    tpl_type: {
      type: DataTypes.STRING(64),
      allowNull: true,
      comment: "模板类型"
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'resume_pdf',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
