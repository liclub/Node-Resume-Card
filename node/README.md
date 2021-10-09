1.config.js 
cardHeadSrc qrcodePath  改为生产环境
environment 改为生产环境
database 数据库改为生产环境

npm install --unsafe-perm

netstat -anp |grep 3019


$ sudo npm install forever -g   #安装
$ forever start app.js          #启动
$ forever stop app.js           #关闭
$ forever start -l forever.log -o out.log -e err.log app.js   #输出日志和错误

服务挂掉重启时，提示：

error: Cannot start forever

error:   log file /export/appadmin/.forever/forever.log exists. Use the -a or --append option to append log.
使用
forever start -a app.js
启动成功