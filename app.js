//app.js
const util = require('utils/util.js')
App({
  onLaunch: function () {
    var globalData = this.globalData
    util.getOpenId({
      result: res => {
        globalData.openId = res.data.openId
      }
    })
    wx.authorize({
      scope: 'scope.userInfo',
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        // console.log("getSetting:" + JSON.stringify(res));
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // console.log("getUserInfo-res:" + JSON.stringify(res));
              console.log("getUserInfo:" + JSON.stringify(res.userInfo));
              // 可以将 res 发送给后台解码出 unionId
              globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openId: null,
    reqIp: "https://gb.zhuguihao.com/appService",
    // reqIp: "http://gb.zhuguihao.com:7777/appService",
    // reqIp: "http://192.168.0.124:7777/appService",
    // reqIp: "http://192.168.0.192:10000/appService",
    token: 'bd506867168d474c9259d1dd0f13af6e'//null
  }
})