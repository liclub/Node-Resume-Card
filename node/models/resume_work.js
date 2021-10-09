const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('resume_work', {
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
    company_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "公司"
    },
    job: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "职位"
    },
    entry_at: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "入职时间"
    },
    leave_at: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "离职时间"
    },
    job_content: {
      type: DataTypes.STRING(2550),
      allowNull: true,
      comment: "工作内容"
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
    tableName: 'resume_work',
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
        name: "resume_work_open_id",
        using: "BTREE",
        fields: [
          { name: "open_id" },
        ]
      },
    ]
  });
};
