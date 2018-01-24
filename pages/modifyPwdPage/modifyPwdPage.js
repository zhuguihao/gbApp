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
    registerCode: '',
    oldPassword:''
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
   * 旧密码输入框
   */
  bindOldPwdInput: function (e) {
    var vm = this;
    var pos = e.detail.cursor;
    var value = e.detail.value;
    vm.setData({
      oldPassword: value
    })
    return {
      value: value,
      cursor: pos
    }
  },
  /**
   * 新密码输入框
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if (options.account) {
      this.setData({
        account: options.account
      });
    }
  },
  /**
     * 修改密码
     */
  bindModify: function () {
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
    if (data.oldPassword.length == 0) {
      wx.showToast({
        title: '请输入旧密码',
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
     * 登陆
     */
    this.infaceModify();
  },
  /**
   * 修改密码
   */
  infaceModify: function () {
    var vm = this;
    var params = {
      account: vm.data.account,
      password: vm.data.password,
      oldPassword: vm.data.oldPassword,
      registerCode: vm.data.registerCode
    }
    util.postHttp("/user/modifyPwd", params, {
      success: res => {
        wx.showToast({
          title: res.data.modifyResult,
          icon: 'none',
          duration: 2000
        })
        if ("success" == res.status) {
          vm.goLoginPage()
        }
      }
    })

  },
  /**
   * 返回首页
   */
  goLoginPage() {
    wx.reLaunch({
      url: '../loginPage/loginPage',
    })
  },
})