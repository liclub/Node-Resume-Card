const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('resume_safe', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(2000),
      allowNull: true,
      comment: "密码"
    },
    open_id: {
      type: DataTypes.STRING(64),
      allowNull: true,
      comment: "openid"
    },
    share: {
      type: DataTypes.STRING(64),
      allowNull: true,
      comment: "是否允许转发"
    },
    collection: {
      type: DataTypes.STRING(64),
      allowNull: true,
      comment: "是否允许收藏"
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
    tableName: 'resume_safe',
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
        name: "resume_safe_open_id",
        using: "BTREE",
        fields: [
          { name: "open_id" },
        ]
      },
    ]
  });
};
