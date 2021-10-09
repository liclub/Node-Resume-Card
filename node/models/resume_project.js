const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('resume_project', {
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
    project_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "项目名称"
    },
    link_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "项目地址"
    },
    job: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "职责"
    },
    begin_at: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "项目开始时间"
    },
    end_at: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "项目结束时间"
    },
    project_content: {
      type: DataTypes.STRING(2550),
      allowNull: true,
      comment: "项目成功"
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
    tableName: 'resume_project',
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
        name: "resume_project_open_id",
        using: "BTREE",
        fields: [
          { name: "open_id" },
        ]
      },
    ]
  });
};
