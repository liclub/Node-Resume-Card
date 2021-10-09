const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('resume_certificate', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    open_id: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "用户openid"
    },
    certificate_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "证书名称"
    },
    certificate_at: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "获取时间"
    },
    state: {
      type: DataTypes.STRING(64),
      allowNull: true,
      comment: "状态 1是 0 否"
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
    tableName: 'resume_certificate',
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
      {
        name: "resume_certificate_open_id",
        using: "BTREE",
        fields: [
          { name: "open_id" },
        ]
      },
    ]
  });
};
