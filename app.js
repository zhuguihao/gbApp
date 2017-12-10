//app.js
App({
  onLaunch: function () {
    var globalData = this.globalData;
    if (wx.openBluetoothAdapter) {
      console.log("版本正常");
      wx.openBluetoothAdapter()
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
    // 登录
    wx.login({
      success: res => {
        console.log("login:" + JSON.stringify(res));
        var params = {
          "jsCode": res.code
        };
        console.log(JSON.stringify(params))
        wx.request({
          method: "POST",
          header: {
            'content-type': 'application/json'
          },
          url: globalData.reqIp + "/getOpenIdByCode",
          data: params,
          success: function (res) {
            console.log(res)
            var data = res.data;
            console.log(data)
            if ("success" == data.status) {
              console.log(data.data.openId);
              globalData.openId = data.data.openId
            }
          },
          fail: function (res) {
            console.log(res.data)
          },
          complete: function (res) {
          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
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
    reqIp: "http://gb.zhuguihao.com:7777"
  }
})