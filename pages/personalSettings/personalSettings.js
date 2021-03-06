//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
Page({
  data: {
    token: null,
    userInfo: null,
    modifyPwdPageUrl:"../modifyPwdPage/modifyPwdPage?account=",
    loginUrl:"../loginPage/loginPage"
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
      url: this.data.loginUrl
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
    util.postHttp("/user/logout", {}, {
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
  },
  /**
   * 修改密码
   */
  modifyPwdPage(){
    wx.navigateTo({
      url: this.data.modifyPwdPageUrl,
  })
  },
})
