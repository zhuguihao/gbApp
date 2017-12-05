// pages/loginPage/loginPage.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 登录账号
     */
    account1: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options);
    if (options.page) {
      var page = options.page;
      console.log(page);
    }
  },
  /**
   * 切换界面属性
   * A:登录
   * B:注册
   * C:修改
   */
  chagePageType: function (res) {
    console.log(res.currentTarget.dataset);
    var params = res.currentTarget.dataset;
    var data = this.data;
    var url = "";
    if ("B" == params.page) {
      url = "../registerPage/registerPage";
    } else {
      console.log(data);
      console.log(data.account);
      url = "../modifyPwdPage/modifyPwdPage?account=" + data.account;
    }
    wx.navigateTo({
      url: url,
    })
  },
  /**
   * 输入框绑定值
   */
  bindAccountInput: function (e) {
    var vm = this;
    var pos = e.detail.cursor;
    var value = e.detail.value;
    var regValue = value.substr(pos - 1, pos);
    console.log(pos);
    console.log(value);
    var account = util.regAccount(regValue, "account");
    console.log(value.splice(pos,1, account));
    return {
      value: account,
      cursor: pos
    }
  },
  /**
   * 输入框改变值
   */
  replace: function (e) {
    var value = e.detail.value
    var pos = e.detail.cursor
    if (pos != -1) {
      //光标在中间
      var left = e.detail.value.slice(0, pos)
      //计算光标的位置
      pos = left.replace(/11/g, '2').length
    }

    //直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value.replace(/11/g, '2'),
      cursor: pos
    }
  },

  /**
   * 登录
   */
  bindLogin: function () {
    wx.reLaunch({
      url: '../homePage/homePage',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})