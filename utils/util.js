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
  var regLowerCase = new RegExp('[a-z]', 'g');//判断用户输入的是否为小写字母
  var regCapitalLetter = new RegExp('[A-Z]', 'g');//判断用户输入的是否为大写字母
  var regNum = new RegExp('[0-9]', 'g');//判断用户输入的是否为数字
  var regCom = new RegExp('.*@.*', 'g');//判断用户输入的是否为 @
  var regD = new RegExp('(\\.)', 'g');//判断用户输入的是否为小数点
  var rsLowerCase = regLowerCase.exec(account);
  var rsCapitalLetter = regCapitalLetter.exec(account);
  var rsNum = regNum.exec(account);
  var rsCom = regCom.exec(account);
  var rsD = regD.exec(account);
  var result = "";
  switch (type) {
    case "account":
      if (rsLowerCase || rsCapitalLetter || rsNum || rsCom || rsD) {
        result = account;
      }
      break;
  }
  console.log(account);
  return account;
}

module.exports = {
  formatTime: formatTime,
  regAccount: check
}

