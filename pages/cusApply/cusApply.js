// pages/customerService.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 流水号
     */
    scanCode: "",
    /**
     * 损坏点
     */
    damagePoint: [
      {
        id: 0,
        name: '电路损坏'
      },
      {
        id: 1,
        name: '插头损坏'
      },
      {
        id: 2,
        name: '不能使用'
      },
      {
        id: 3,
        name: '机箱破损'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  /**
   * 扫码事件
   */
  scanCodeTap() {
    var vm = this;
    wx.showLoading({
      title: '扫码中,请稍后..',
      mask: true
    });
    wx.scanCode({
      onlyFromCamera: true,// 只允许从相机扫码
      success: (res) => {
        wx.hideLoading();
        // if ("QR_CODE" == res.scanType) {//二维码
        //   vm.setData({
        //     scanCode: res.result
        //   })
        //   return
        // } else 
        if ("CODE_128" == res.scanType) {//条形码
          vm.setData({
            scanCode: res.result
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '识别失败，请重试！',
            showCancel: false
          })
          return
        }
        wx.showToast({
          title: '正在查询产品信息',
          icon: 'loading',
          duration: 2000
        })
      },
      fail: (res) => {
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '识别失败，请重试！',
          showCancel: false
        })
      },
      //接口调用结束的回调函数（调用成功、失败都会执行）
      complete: () => {
        console.log("接口调用结束的回调函数（调用成功、失败都会执行）");
      }
    })
  },
  /**
   * 损坏点
   */
  bindDamagePointChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
})