const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
   * 校验只能输入中文，英文和 @
   */
// const regAccount = function (account) {
//   console.log(123123123123);
//   console.log(account);
//   var reg = new RegExp('/^[0-9a-zA-Z]+$/', 'g');
//   console.log(reg);
//   console.log(reg.exec(account));
// }

const check = function (account, type) {
  var regLowerCase= /[a-z]/;//判断用户输入的是否为小写字母
  var regCapitalLetter = /[A-Z]/;//判断用户输入的是否为大写字母
  var regNum = /[0-9]/;//判断用户输入的是否为数字
  var regCom = /.*@.*/;//判断用户输入的是否为 @
  var regD = /(\\.)/;//判断用户输入的是否为小数点
  var regSpace = " ";//空格
  var regS = /((?=[\x21-\x7e]+)[^A-Za-z0-9])/g;//特殊符号
  var regCh = /[^\x00-\xff]/g;//中文
  switch (type) {
    case "account":
      account = account.replace(regCh,"");
      account = account.replace(regS, "");
      account = account.replace(regSpace, "");
      break;
  }
  return account;
}

module.exports = {
  formatTime: formatTime,
  regAccount: check
}

