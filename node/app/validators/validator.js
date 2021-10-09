const { LinValidator, Rule } = require('../../core/lin-validator-v2')
const { User } = require('../models/user')
const { LoginType, ArtType } = require('../lib/enum');
const { decode } = require('../../core/util');

class TokenValidator extends LinValidator{
  constructor() {
    super();
    this.account = [
      new Rule('isLength', '不符合账号规则', {
        min: 4,
        max: 32
      })
    ]
    this.secret = [
      //  isOptional  不允许字段为空 optional 允许字段为空
      new Rule('optional'),
      new Rule('isLength', '至少6个字符',{
        min: 6,
        max: 128
      })
    ]
    this.validateType = checkType
  }
}

function checkType(vals) {
  let type = vals.body.type || vals.path.type;
  if(!type) {
    throw new Error('type是必填参数');
  }
  type = parseInt(type);
  if(!LoginType.isThisType(type)) {
    throw new Error('type参数不合法');
  }
}

class CommonValidator extends LinValidator {
  constructor() {
    super()
  }
}

class IdValidator extends LinValidator {
  constructor() {
    super();
    this.id = [
      new Rule('isLength', 'id不允许为空',{ min: 1 })
    ]
  }
}

class ToPDFValidator extends LinValidator {
  constructor() {
    super();
    this.pdf_type = [
      new Rule('isLength', 'pdf_type不允许为空',{ min: 1 })
    ]
  }
}


class EmailValidator extends LinValidator {
  constructor() {
    super();
    this.email = [
      new Rule('isLength', 'email不允许为空',{ min: 1 })
    ]
    this.title = [
      new Rule('isLength', 'title不允许为空',{ min: 1 })
    ]
    this.tpl = [
      new Rule('isLength', 'tpl不允许为空',{ min: 1 })
    ]
  }
}


class PasswordValidator extends LinValidator {
  constructor() {
    super();
  }
  validatePassword(vals) {
    const decodePwd = decode(vals.body.password);
    if (!decodePwd) {
      throw new Error('密码不能为空')
    }
  }
}


class ImgUploadValidator extends LinValidator {
  constructor() {
    super();
    this.imgBase64 = [
      new Rule('optional','图片不允许为空')
    ]
  }
}

// 正整数校验
class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super() // 调用基类构造函数
    // Rule 三个参数 第一个规则 第二个提示  第三个限制 
    // 多个校验规则关系是 且 的关系
    this.id = [
      new Rule('isInt', '需要是正整数', { min: 1 })
    ]
  }
}

class RegisterValidator extends LinValidator {
  constructor() {
    super();

    this.email = [
      new Rule ('isEmail', '不符合email规范')
    ]
    this.password1 = [// 用户密码制定范围
      new Rule('isLength', '密码至少6个字符，最多32个字符', { min: 6, max: 32}),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ]
    this.password2 = this.password1;
    this.nickname = [
      new Rule('isLength', '昵称不符合长度规范', { min: 4, max: 32}),
    ]
  }

  validatePassword(vals) {
    const psw1 = vals.body.password1;
    const psw2 = vals.body.password2;
    
    if( psw1!== psw2) {
      throw new Error('两个密码必须相同')
    }
  }

  async validateEmail(vals) {
    const email = vals.body.email;
    const user = await User.findOne({
      where: {
        email: email
      }
    })

    if(user) {
      throw new Error('email已存在')
    }
  }
}

function checkArtType(vals) {
  let type = vals.body.type || vals.path.type;
  if(!type) {
    throw new Error('type是必填参数');
  }
  type = parseInt(type);
  if(!ArtType.isThisType(type)) {
    throw new Error('type参数不合法');
  }
}

class Checked {
  constructor(type) {
    this.enumType = type
  }

  check(vals) {
    let type = vals.body.type || vals.path.type;
    if(!type) {
      throw new Error('type是必填参数');
    }
    type = parseInt(type);
    if(!this.enumType.isThisType(type)) {
      throw new Error('type参数不合法');
    }
  }
}

class NotEmptyValidator extends LinValidator{
  constructor() {
    super()
    this.token = [
      new Rule('isLength', '不允许为空', { min: 1 })
    ]
  }
}

class LikeValidator extends PositiveIntegerValidator{
  constructor() {
    super()
    this.validateType = checkArtType;
    // const checker = new Checked(ArtType);
    // this.validateType = checker.check.bind(checker);
  }
}

class ClassicValidator extends LikeValidator {
 
}


class UserUpdateValidator extends LinValidator {
  constructor() {
    super()
  }
}


class CardValidator extends LinValidator {
  constructor() {
    super()
  }
}



class CardCreateValidator extends LinValidator {
  constructor() {
    super()
    this.userCardName = [
      new Rule('isLength', '姓名不允许为空', { min: 1 })
    ]
    this.cardMobile = [
      new Rule('isLength', '手机号不允许为空', { min: 1 }),
      new Rule('isMobilePhone', '手机号不符合规范')
    ]
    this.userEmail = [
      new Rule('isLength', '邮箱不允许为空', { min: 1 }),
      new Rule('isEmail','邮箱不符合规范')
    ]
    this.wechatCode = [
      new Rule('isLength', '微信号不允许为空', { min: 1 })
    ]
    this.cardUserIntrodduce = [
      new Rule('isLength', '自我介绍不允许为空且最多50个字符', { min: 1,max: 50 })
    ]
    this.cardCompany = [
      new Rule('isLength', '公司不允许为空', { min: 1 })
    ]
    this.cardJob = [
      new Rule('isLength', '工作不允许为空', { min: 1 })
    ]
  }
}



class CardGetByIdValidator extends LinValidator {
  constructor() {
    super();
    this.cardId = [
      new Rule('isLength', 'id不允许为空', { min: 1 })
    ]
  }
}



class LogInsertValidator extends LinValidator {
  constructor() {
    super();
    this.saveid = [
      new Rule('isLength', 'saveid不允许为空', { min: 1 })
    ]
  }
}


class BookInsertValidator extends LinValidator {
  constructor() {
    super();
    this.customerid = [
      new Rule('isLength', 'customerid不允许为空', { min: 1 })
    ]
  }
}


class QrcodeGetValidator extends LinValidator {
  constructor() {
    super();
    this.page = [
      new Rule('isLength', 'page不允许为空', { min: 1 })
    ]
  }
}

class LogDetailValidator extends LogInsertValidator {
  constructor() {
    super();
    this.saveid = [
      new Rule('isLength', 'saveid不允许为空', { min: 1 })
    ]
  }
}


class BookDeleteValidator extends LinValidator {
  constructor() {
    super();
    this.customerid = [
      new Rule('isLength', 'customerid不允许为空', { min: 1 })
    ]
  }
}

class BookGetValidator extends LinValidator{
  constructor() {
    super()
  }
}

 module.exports = { 
   TokenValidator,
   CommonValidator,
   IdValidator,
   ToPDFValidator,
   EmailValidator,
   PasswordValidator,
   ImgUploadValidator,
   PositiveIntegerValidator, 
   RegisterValidator,
   NotEmptyValidator,
   LikeValidator,
   ClassicValidator,
   UserUpdateValidator,
   CardValidator,
   CardCreateValidator,
   CardGetByIdValidator,
   LogInsertValidator,
   BookInsertValidator,
   QrcodeGetValidator,
   LogDetailValidator,
   BookDeleteValidator,
   BookGetValidator
}