export function isHour24 (str) { // 24小时制时间（HH:mm:ss）
  return /^((?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$)/.test(str)
}

export function isHour12 (str) { // 12小时制时间（hh:mm:ss）
  return /^(1[0-2]|0?[1-9]):[0-5]\d:[0-5]\d$/.test(str)
}

export function isBase64 (str) { // base64格式
  // eslint-disable-next-line no-useless-escape
  return /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i.test(str)
}

export function isStandardCurrency (str) { // 数字/货币金额（支持负数、千分位分隔符）
  return /(^[-]?[1-9]\d{0,2}($|(,\d{3})*($|(\.\d{1,2}$))))|((^[0](\.\d{1,2})?)|(^[-][0]\.\d{1,2}))$/.test(str)
}

export function isBankCardNumber (str) { // 银行卡号（16或19位）
  return /^([1-9]{1})(\d{15}|\d{18})$/.test(str)
}

export function isChineseName (str) { // 中文姓名
  return /^([\u4e00-\u9fa5·]{2,10})$/.test(str)
}

export function isNewEnergyCar (str) { // 新能源车牌号
  return /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$/.test(str)
}

export function isNotNewEnergyCar (str) { // 非新能源车牌号
  return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/.test(str)
}

export function isCar (str) { // 车牌号(新能源+非新能源)
  return /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/.test(str)
}

export function isURL (str) { // URL链接(网址)
  return /^((https?|ftp|file):\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/\w\.-]*)*\/?/.test(str)
}

export function isStrictPhone (str) { // 手机号(严谨), 根据工信部2019年最新公布的手机号段
  return /^((https?|ftp|file):\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/\w\.-]*)*\/?/.test(str)
}

export function isPhone (str) { // 手机号(宽松), 只要是13,14,15,16,17,18,19开头即可
  return /^1[3-9]\d{9}$/.test(str)
}

export function isSimplePhone (str) { // 手机号(最宽松), 只要是1开头即可, 如果你的手机号是用来接收短信, 优先建议选择这一条
  return /^1\d{10}$/.test(str)
}

export function isDate (str) { // 日期, 如: 2000-01-01或2000-1-1
  return /^\d{4}(-)([0-1][0-2]|\d)\1([0-2]\d|\d|30|31)$/.test(str)
}

export function isEmail (str) { // email地址
  return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(str)
}

export function isFixedPhone (str) { // 国内座机电话,如: 0341-86091234
  return /\d{3}-\d{8}|\d{4}-\d{7}/.test(str)
  // return /^0\d{2,3}-\d{7,8}$/.test(str)
}

export function isOldIDCard (str) { // 一代身份证号(15位数字)
  return /^\d{8}(0\d|11|12)([0-2]\d|30|31)\d{3}$/.test(str)
}

export function isNewIDCard (str) { // 二代身份证号(18位数字),最后一位是校验位,可能为数字或字符X
  return /^\d{6}(18|19|20)\d{2}(0\d|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$/.test(str)
}

export function isIDCard (str) { // 身份证号, 支持1/2代(15位/18位数字)
  return /(^\d{8}(0\d|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/.test(str)
}

export function isAccount (str) { // 帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线组合
  return /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/.test(str)
}

export function isChinese (str) { // 纯中文/汉字
  return /^[\u4E00-\u9FA5]+$/.test(str)
}

export function isDecimal (str) { // 是否小数
  return /^\d+\.\d+$/.test(str)
}

export function isHTML (str) { // 是否html标签
  return /<(.*)>.*<\/\1>|<(.*) \/>/.test(str)
}

export function isQQ (str) { // 是否qq号格式正确
  return /^[1-9][0-9]{4,10}$/.test(str)
}

export function isPassword (str) { // 密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
  return /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(str)
}

export function isIpv4 (str) { // ipv4地址正则
  return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(str)
}

export function isColor (str) { // 16进制颜色
  return /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(str)
}

export function isWechat (str) { // 微信号，6至20位，以字母开头，字母，数字，减号，下划线
  return /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/.test(str)
}

export function isChinaPost (str) { // 中国邮政编码
  return /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/.test(str)
}

export function isImageURL (str) { // 图片链接地址（图片格式可按需增删）
  return /^https?:\/\/.*?(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif)$/i.test(str)
}

export function isVideoURL (str) { // 视频链接地址（视频格式可按需增删）
  return /^https?:\/\/.*?(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4)$/i.test(str)
}
