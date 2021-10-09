const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('resume_message', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    message: {
      type: DataTypes.STRING(2000),
      allowNull: true,
      comment: "消息"
    },
    type: {
      type: DataTypes.STRING(64),
      allowNull: true,
      comment: "消息类型 1系统消息 2 个人消息"
    },
    receive_open_id: {
      type: DataTypes.STRING(64),
      allowNull: true,
      comment: "接收者的openid"
    },
    send_open_id: {
      type: DataTypes.STRING(64),
      allowNull: true,
      comment: "发送者的openid"
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
    tableName: 'resume_message',
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
        name: "resume_message_receive_open_id",
        using: "BTREE",
        fields: [
          { name: "receive_open_id" },
        ]
      },
      {
        name: "resume_message_send_open_id",
        using: "BTREE",
        fields: [
          { name: "send_open_id" },
        ]
      },
    ]
  });
};
