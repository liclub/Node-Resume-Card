const nodemailer = require("nodemailer");

function emailTo(email,subject,text,html,callback) {
  const smtp = global.config.email.smtp;
  const mailFrom = global.config.email.mailFrom;
  const mailPwd = global.config.email.mailPwd;


  var transporter = nodemailer.createTransport({
      host: smtp,
      auth: {
          user: mailFrom,
          pass: mailPwd //授权码,通过QQ获取
      },
      proxy: 'http://10.1.27.102:8080'
  });
  var mailOptions = {
      from: mailFrom, // 发送者
      to: email, // 接受者,可以同时发送多个,以逗号隔开
      subject: subject, // 标题
  };
  if(text)
  {
      mailOptions.text =text;// 文本
  }
  if(html)
  {
      mailOptions.html =html;// html
  }

  var result = {
      httpCode: 200,
      message: '发送成功!',
  }
  try {
      transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
              result.httpCode = 500;
              result.message = err;
              callback(result);
              return;
          }
          callback(result);
      });
  } catch (err) {
      result.httpCode = 500;
      result.message = err;
      callback(result);
  }

}

module.exports = {
  emailTo
}