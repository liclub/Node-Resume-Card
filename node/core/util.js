const jwt = require('jsonwebtoken')
const JsBase64 = require('js-base64');

/***
 * 
 */
const findMembers = function (instance, {
    prefix,
    specifiedType,
    filter
}) {
    // 递归函数
    function _find(instance) {
        //基线条件（跳出递归）
        if (instance.__proto__ === null)
            return []

        let names = Reflect.ownKeys(instance)
        names = names.filter((name) => {
            // 过滤掉不满足条件的属性或方法名
            return _shouldKeep(name)
        })

        return [...names, ..._find(instance.__proto__)]
    }

    function _shouldKeep(value) {
        if (filter) {
            if (filter(value)) {
                return true
            }
        }
        if (prefix)
            if (value.startsWith(prefix))
                return true
        if (specifiedType)
            if (instance[value] instanceof specifiedType)
                return true
    }

    return _find(instance)
}



const generateToken = function (uid, scope) {
    const secretKey = global.config.security.secretKey
    const expiresIn = global.config.security.expiresIn
    const token = jwt.sign({
        uid,
        scope
    }, secretKey, {
        expiresIn: expiresIn
    })
    return token
}



// 加密
const encode = (name) => {
    const salting = global.config.salting;
    return JsBase64.encode(name + salting)
  }
  
// 解密
const decode = (name) => {
const salting = global.config.salting;
let decodeName = JsBase64.decode(name) || ''
if (decodeName && decodeName.split && decodeName.split(salting) && decodeName.split(salting)[0]) {
    return decodeName.split(salting)[0]
} else {
    return ''
}
}

module.exports = {
    findMembers,
    generateToken,
    encode,
    decode
}