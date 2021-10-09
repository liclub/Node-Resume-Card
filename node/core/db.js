// sequelize-auto -h 数据库的IP地址 -d 数据库名 -u 用户名 -x 密码 -p 端口 -t 表名
// sequelize-auto -h localhost -d resume -u root -x lhy123456 -p 3306 -t resume_safe

const Sequelize = require('sequelize');
const {
  dbName,
  host,
  port,
  user,
  password
} = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: console.log,
  timezone: '+08:00',
  define: {
    timestamps: true, // 是否有create_time update_time
    // underscored: true, // 驼峰转成下划线
    createdAt: 'created_at', // 更名默认命名
    updatedAt: 'updated_at', // 更名默认命名
    freezeTableName:true, // 禁用修改表名;默认情况下,sequelize会自动将模型名称(第一个参数定义‘User’)为复数。值为ture时不修改
    scopes:{
        bh:{
            attributes:{
                exclude:['updated_at','deleted_at','created_at']
            }
        }
    }
  },
});

sequelize.sync({
  force: false // 是否自动删除表
});

module.exports = {
  db: sequelize
}