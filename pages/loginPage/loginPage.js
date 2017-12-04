// pages/loginPage/loginPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    var url ="";
    if ("B" == params.page) {
      url = "../registerPage/registerPage";
    } else {
      url = "../modifyPwdPage/modifyPwdPage";
    }
    wx.navigateTo({
      url: url,
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