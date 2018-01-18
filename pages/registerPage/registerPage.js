// pages/registerPage/registerPage.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 注册
   */
  register: function () {
    wx.navigateBack({
      delta:1
    })
  },
  /**
   * 输入框绑定值
   */
  bindAccountInput: function (e) {
    var vm = this;
    var pos = e.detail.cursor;
    var value = e.detail.value;
    return {
      value: util.regAccount(value, "account"),
      cursor: pos
    }
  },
})