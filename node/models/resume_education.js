const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('resume_education', {
    colleges: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "学校"
    },
    major: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "专业"
    },
    education: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "学历"
    },
    graduation_at: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "毕业时间"
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
    tableName: 'resume_education',
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
        name: "resume_education_open_id",
        using: "BTREE",
        fields: [
          { name: "open_id" },
        ]
      },
    ]
  });
};
