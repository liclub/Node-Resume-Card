const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

function emailTo (mailOptions) {
  const smtp = global.config.email.smtp;
  const mailFrom = global.config.email.mailFrom;
  const mailPwd = global.config.email.mailPwd;

  // 开启一个 SMTP 连接池
  const transporter = nodemailer.createTransport(smtpTransport({
    host: smtp,//主机
    secure: true, // 使用 SSL
    secureConnection: true, // 使用 SSL
    port: 465, // SMTP 端口
    auth: {
      user: mailFrom,
      pass: mailPwd //授权码,通过QQ获取  
    }
  }));
  mailOptions.from = mailFrom;
  let result = {
    httpCode: 200,
    message: '发送成功!',
    data: [],
  }
  return new Promise((resolve, reject)=> {
    try {
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          result.httpCode = 500;
          result.message = err;
          reject(result)
          return;
        }
        resolve(result)
      });
    } catch (err) {
      result.httpCode = 500;
      result.message = err;
      reject(result)
    }
    transporter.close(); // 如果没用，关闭连接池
  })
}

module.exports= {
  emailTo
}