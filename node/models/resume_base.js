const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('resume_base', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    open_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "openid"
    },
    user_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "姓名"
    },
    job: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "职位"
    },
    head_src: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "上传头像地址"
    },
    sex: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "性别"
    },
    age: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "年龄"
    },
    work_years: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "工龄"
    },
    birthday: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "出生日期"
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "城市"
    },
    mobile: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "手机"
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "邮箱"
    },
    wechat: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "微信"
    },
    qq: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "qq"
    },
    weibo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "微博"
    },
    introduce: {
      type: DataTypes.STRING(2550),
      allowNull: true,
      comment: "自我介绍"
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
    tableName: 'resume_base',
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
        name: "resume_base_open_id",
        using: "BTREE",
        fields: [
          { name: "open_id" },
        ]
      },
    ]
  });
};
