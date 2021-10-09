
module.exports = {
  // dev test prod
  environment: 'prod',
  database: {
    dbName: 'resume',
    // host: '106.14.201.223',
    host:'localhost',
    port: 3306,
    user: 'root',
    password: 'lhy123456'
  },
  security: {
    secretKey: "jbt3H2WCTqcTlssmytvIC2ywYT8Y9Gl2",
    expiresIn: 60 * 60 * 24
  },
  wx: {
    app_id: 'wxa411024686dd355e',
    app_secret: '7e8adc10f9eb5abaeb12d05ff6f07ef1',
    // %s 占位符
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code',
    accessToken: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s',
    getwxacodeunlimit: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=%s'
  },
  email: {
    smtp: 'smtp.163.com',
    mailFrom: 'personalresume2021@163.com',
    mailPwd: 'AZYDPVTTISKFVRSS'
  },
  salting: 'fIy8YlQB1CzXlq3RUuJm420WzfV9pkyx',
  // cardHeadSrc: '/Users/mac/Desktop/LearnWorkSpace/cardImg/headImg/', // 头像地址
  // qrcodePath: '/Users/mac/Desktop/LearnWorkSpace/cardImg/qrcode/',
  // tplPath: '/Users/mac/Desktop/LearnWorkSpace/cardImg/tpl/',
  // pdfPath: '/Users/mac/Desktop/LearnWorkSpace/cardImg/pdf/',
  // pdfLink: '/Users/mac/Desktop/LearnWorkSpace/cardImg/pdf/'
  cardHeadSrc: '/Program/Webapp/cardImg/headImg/', // 头像地址
  qrcodePath: '/Program/Webapp/cardImg/qrcode/',
  tplPath: '/Program/Webapp/cardImg/tpl/',
  pdfPath: '/Program/Webapp/cardImg/pdf/',
  pdfLink: 'https://www.liclub.online/pdf/'


}