// pages/registerPage/registerPage.js
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '',
    password: '',
    registerCode: ''
  },
  /**
   * 账号输入框
   */
  bindAccountInput: function (e) {
    var vm = this;
    var pos = e.detail.cursor;
    var value = e.detail.value;
    vm.setData({
      account: value
    })
    return {
      value: util.regAccount(value, "account"),
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
   * 验证码输入框
   */
  bindRegisterCodeInput: function (e) {
    var vm = this;
    var pos = e.detail.cursor;
    var value = e.detail.value;
    vm.setData({
      registerCode: value
    })
    return {
      value: value,
      cursor: pos
    }
  },
  /**
   * 注册
   */
  bindRegister: function () {
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
    // if (data.registerCode.length == 0) {
    //   wx.showToast({
    //     title: '请输入验证码',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   return
    // }
    /**
     * 获取当前用的基本信息
     */
    util.getUserInfo({
      success: res => {
        /**
             * 登陆
             */
        this.infaceRegister();
      }
    });
    
  },
  /**
   * 注册
   */
  infaceRegister: function () {
    var vm = this;
    var params = {
      account: vm.data.account,
      password: vm.data.password,
      registerCode: vm.data.registerCode,
      nickName: app.globalData.userInfo.nickName,
      gender: app.globalData.userInfo.gender,
      city: app.globalData.userInfo.city,
      province: app.globalData.userInfo.province,
      country: app.globalData.userInfo.country,
      avatarUrl: app.globalData.userInfo.avatarUrl,
      openId: app.globalData.openId
    }
    util.postHttp("/register", params, {
      success: res => {
        wx.showToast({
          title: res.data.registerResult,
          icon: 'none',
          duration: 2000
        })
        if ("success" == res.status) {
          vm.infaceLogin()
        }
      }
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
    util.postHttp("/login", params, {
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
        } else {
        }
      }
    })
  },
  /**
   * 返回首页
   */
  goHomePage() {
    wx.reLaunch({
      url: '../homePage/homePage',
    })
  }
})