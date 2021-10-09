const { TplHtml } = require('./tplHtml');
const fs = require("fs")

class Tpl extends TplHtml{

  constructor(tplType = '1') {
    super()
    this.tplType = tplType;
  }

  // list 遍历的数据 如 教育信息  type 遍历数据类型 如 education 
  formHtml(list, type) {
    const tpl = 'Tpl' + this.tplType;
    const tplFunc = type + tpl;
    let html = '';
    for (let item of list){
      html+= this[tplFunc](item);
    }
    return html;
  }
}

module.exports = {
  Tpl
}