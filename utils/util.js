
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

const check = function (account, type) {
  var regLowerCase = /[a-z]/;//判断用户输入的是否为小写字母
  var regCapitalLetter = /[A-Z]/;//判断用户输入的是否为大写字母
  var regNum = /[0-9]/;//判断用户输入的是否为数字
  var regCom = /.*@.*/;//判断用户输入的是否为 @
  var regD = /(\\.)/;//判断用户输入的是否为小数点
  var regSpace = " ";//空格
  var regS = /((?=[\x21-\x7e]+)[^A-Za-z0-9])/g;//特殊符号
  var regCh = /[^\x00-\xff]/g;//中文
  switch (type) {
    case "account":
      account = account.replace(regCh, "");
      account = account.replace(regS, "");
      account = account.replace(regSpace, "");
      break;
  }
  return account;
}
/**
 * 登陆当前的账号并获取openId
 * 方法调用：
 * util.getOpenId({success: res => {},fail: res => {}})
 */
const getOpenId = function (fun) {

  wx.login({
    success: res => {
      var params = {
        "jsCode": res.code
      };
      console.log(JSON.stringify(params))
      this.postHttp("/wechat/getOpenIdByCode", params, {
        success: res => {
          fun.result(res)
        }
      })
    }
  })

}

/**
 * HTTP:POST请求
 * 
 */
const postHttp = function (url, params, fun) {
  console.log("url:  " + url)
  console.log("params:  " + JSON.stringify(params))
  let LoadingBool = true;
  if ("/wechat/getOpenIdByCode" == url) {
    LoadingBool = false;
  }
  if (LoadingBool) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  }
  wx.request({
    method: "POST",
    header: {
      'content-type': 'application/json',
      token: getApp().globalData.token
    },
    url: getApp().globalData.reqIp + url,
    data: params,
    success: function (res) {
      console.log(res.data)
      if (LoadingBool) {
        wx.hideLoading()
      }
      if (200 == res.statusCode) {
        fun.success(res.data)
      } else {
        if (LoadingBool) {
          wx.showToast({
            title: '网络异常请重试',
            icon: 'loading',
            duration: 2000
          })
        }
      }
    },
    fail: function (res) {
      console.log(res)
      wx.hideLoading()
      if (LoadingBool) {
        wx.showToast({
          title: '网络异常请重试',
          icon: 'loading',
          duration: 2000
        })
      }
    }
  })
}
/**
  * 获取用户信息
*/
const getUserInfo = function (fun) {
  // 获取用户信息
  wx.getSetting({
    success: res => {
      if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            // 可以将 res 发送给后台解码出 unionId
            getApp().globalData.userInfo = res.userInfo

            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res)
            }
            fun.success();
          }
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '请允许该应用使用您的用户信息',
          confirmText: '前往授权',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.openSetting();
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        return
      }
    }
  })
}

module.exports = {
  formatTime: formatTime,
  regAccount: check,
  getOpenId: getOpenId,
  postHttp: postHttp,
  getUserInfo: getUserInfo
}

