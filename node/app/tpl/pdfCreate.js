const fs = require("fs")
const moment = require('moment'); // moment.js
const pdf = require('html-pdf'); // html-pdf
const mime = require('mime-types'); //需npm安装

class PdfCreate{
  constructor(options) {
    // pdf配置
    this.options = options ? options : { 
      "format": 'A4',
      "header": {
        "height": "10mm",
        "contents": ''
      }
    }
  }
  /**
    template: html 模板
    options: 配置
    reg: 正则匹配规则
    filename: 输出pdf文件路径及文件名
  */
  static async createPDFProtocolFile(tplType, reg, filename) {
    let template = fs.readFileSync(global.config.tplPath + 'resume'+ tplType +'.html', 'utf8'); // 引入html模板
    // 将所有匹配规则在html模板中匹配一遍
    if (reg && Array.isArray(reg)) {
      reg.forEach(item => {
        template = template.replace(item.relus, item.match);
      });
    }
    await new Promise((resolve, reject)=>{
      pdf.create(template, this.options).toFile(filename, function(err, res) {
        console.log(err)
          if (err) {
            console.log(err)
            reject(err)
          }
          resolve(res)
      });
    })
  }
}

module.exports = {
  PdfCreate
}