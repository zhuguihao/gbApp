//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
Page({
  data: {
    token: null,
    userInfo: null
  },
  onLoad: function (e) {
    let vm = this
    console.log(app.globalData.userInfo)
    vm.setData({
      token: app.globalData.token,
      userInfo: app.globalData.userInfo
    })
  },
  /**
   * 登录
   */
  loginFun: function () {
    wx.navigateTo({
      url: '../loginPage/loginPage'
    })
  },
  /**
   * 退出登录
   */
  outLoginFun: function () {
    var vm = this
    /**
     * 删除基本数据
     */
    util.postHttp("/user/outLogin", {}, {
      success: res => {
        var tips;
        if ("success" == res.status) {
          tips = res.data.outLoginResult
          app.globalData.token = null;
          app.globalData.userInfo = null;
          vm.setData({
            token: app.globalData.token,
            userInfo: app.globalData.userInfo
          })
        } else {
          tips = res.msg
        }
        wx.showToast({
          title: tips,
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})
