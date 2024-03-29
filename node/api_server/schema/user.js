const joi = require("joi");
// https://joi.dev/api/?v=17.8.3#introduction

/**
  - string() 值必须是字符串
  - alphanum() 值只能是包含 a-zA-Z0-9 的字符串
  - min(length) 最小长度
  - max(length) 最大长度
  - required() 值是必填项，不能为 undefined
  - pattern(正则表达式) 值必须符合正则表达式的规则
  */
// 用户名的验证规则
const username = joi.string().alphanum().min(3).max(10).required();
// 密码的验证规则
// const password = joi.string().pattern(/^[\S]{6,12}$/).required().error((err) => {
//     console.log(err, 'err');
// });
const password = joi.string().pattern(/^[\S]{6,12}$/).required();
// 定义 id, nickname, emial 的验证规则
// https://blog.csdn.net/qq_42543244/article/details/126605768
// const id = joi.number().integer().min(1).required().error(new Error("id不合法1"));
const id = joi.number().integer().min(1).required().messages({
    "number.integer": "id必须为整数",
    "number.min": "id最小为1",
    "any.required": "id必须"
});
const nickname = joi.string().required();
// const email = joi.string().email().required().messages({
//     "string.email": "email格式不对",
//     "any.required": "email必须"
// });

const email = joi.string().email().required().error((err) => {
    console.log(err, 'email-err');
});
// dataUri() 指的是如下格式的字符串数据：
// data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
const avatar = joi.string().dataUri().required();

// 注册和登录表单的验证规则对象
exports.reg_login_schema = {
    // 表示需要对 req.body 中的数据进行验证
    body: {
        username,
        password,
    },
}
// 验证规则对象 - 更新用户基本信息
exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email,
    },
}
// 验证规则对象 - 重置密码
exports.update_password_schema = {
    body: {
        // 使用 password 这个规则，验证 req.body.oldPwd 的值
        oldPwd: password,
        // 使用 joi.not(joi.ref('oldPwd')).concat(password) 规则，验证 req.body.newPwd 的值
        // 解读：
        // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
        // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
        // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
        // [
        //     {
        //       code: 'string.pattern.base',
        //       flags: { presence: 'required', error: [Function (anonymous)] },
        //       messages: {
        //         'any.custom': [Object],
        //         'any.default': [Object],
        //         'any.failover': [Object],
        //         'any.invalid': [Object],
        //         'any.only': [Object],
        //         'any.ref': [Object],
        //         'any.required': [Object],
        //         'any.unknown': [Object],
        //         'string.alphanum': [Object],
        //         'string.base': [Object],
        //         'string.base64': [Object],
        //         'string.creditCard': [Object],
        //         'string.dataUri': [Object],
        //         'string.domain': [Object],
        //         'string.email': [Object],
        //         'string.empty': [Object],
        //         'string.guid': [Object],
        //         'string.hex': [Object],
        //         'string.hexAlign': [Object],
        //         'string.hostname': [Object],
        //         'string.ip': [Object],
        //         'string.ipVersion': [Object],
        //         'string.isoDate': [Object],
        //         'string.isoDuration': [Object],
        //         'string.length': [Object],
        //         'string.lowercase': [Object],
        //         'string.max': [Object],
        //         'string.min': [Object],
        //         'string.normalize': [Object],
        //         'string.token': [Object],
        //         'string.pattern.base': [Object],
        //         'string.pattern.name': [Object],
        //         'string.pattern.invert.base': [Object],
        //         'string.pattern.invert.name': [Object],
        //         'string.trim': [Object],
        //         'string.uri': [Object],
        //         'string.uriCustomScheme': [Object],
        //         'string.uriRelativeOnly': [Object],
        //         'string.uppercase': [Object]
        //       },
        //       path: [ 'newPwd' ],
        //       prefs: {
        //         abortEarly: true,
        //         allowUnknown: true,
        //         artifacts: false,
        //         cache: true,
        //       template: null,
        //       local: {
        //         name: undefined,
        //         regex: /^[\S]{6,12}$/,
        //         value: 'qqq',
        //         label: 'newPwd',
        //         key: 'newPwd'
        //       }
        //     }
        // ]
        // newPwd: joi.not(joi.ref('oldPwd')).concat(password).error((err) => {
        //     // any.invalid 新密码与旧密码相同
        //     // string.pattern.base 新密码不符合规则校验
        //     console.log(err, '重置密码');
        //     return new Error(err[0].code)
        // }),
        newPwd: joi.not(joi.ref('oldPwd')).concat(password),
    },
}

// 验证规则对象 - 更新头像
exports.update_avatar_schema = {
    body: {
        avatar,
    },
}