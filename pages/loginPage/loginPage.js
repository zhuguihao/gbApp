// pages/loginPage/loginPage.js
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    account: '',
    password: '',
  },
  onShow:function(){
    wx.hideTabBar({
      
    })
  },
  /**
   * 切换界面属性
   * A:登录
   * B:注册
   * C:修改
   */
  chagePageType: function (res) {
    var params = res.currentTarget.dataset;
    var data = this.data;
    var url = "";
    if ("B" == params.page) {
      url = "../registerPage/registerPage";
    } else {
      url = "../modifyPwdPage/modifyPwdPage?account=" + data.account;
    }
    wx.navigateTo({
      url: url,
    })
  },
  /**
   * 账号输入框
   */
  bindAccountInput: function (e) {
    var vm = this;
    var pos = e.detail.cursor;
    var value = e.detail.value;
    value = util.regAccount(value, "account")
    vm.setData({
      account: value
    })
    return {
      value: value,
      cursor: pos
    }
  },
  /**
   * 密码输入框
   */
  bindPwdInput: function (e) {
    var vm = this;
    var pos = e.detail.cursor;
    var value = e.detail.value;
    vm.setData({
      password: value
    })
    return {
      value: value,
      cursor: pos
    }
  },
  /**
   * 登录
   */
  bindLogin: function () {
    /**
     * 校验入参是否OK
     */
    var vm = this;
    var data = vm.data;
    if (data.account.length == 0) {
      wx.showToast({
        title: '请输入账号',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (data.password.length == 0) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000
      })
      return
    }
    /**
     * 获取当前用的基本信息
     */
    // this.getUserInfo();
    /**
     * 登陆
     */
    this.infaceLogin();
  },
  /**
  * 返回首页
  */
  goHomePage() {
    wx.reLaunch({
      url: '../homePage/homePage',
    })
  },
  /**
   * 调用后台登陆接口
   */
  infaceLogin: function () {
    var vm = this
    var params = {
      account: vm.data.account,
      password: vm.data.password
    }
    util.postHttp("/user/login", params, {
      success: res => {
        wx.showToast({
          title: res.data.loginResult,
          icon: 'none',
          duration: 2000
        })
        if ("success" == res.status) {
          app.globalData.token = res.data.token
          app.globalData.userInfo = res.data.userInfo
          vm.goHomePage();
        }
      }
    })
  },
  /**
   * 获取用户信息
   */
  getUserInfo: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
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

        }
      }
    })
  }
})