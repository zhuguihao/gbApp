// pages/companyIndex/companyIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://gb.zhuguihao.com/image/product-desc.jpg',
      'https://gb.zhuguihao.com/image/product01.jpg',
      'https://gb.zhuguihao.com/image/product02.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 10000,
    duration: 100,
    windowHeight: 0,
    windowWidth: 0
  },
  onLoad: function (e) {
    let vm = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowWidth);
        console.log(res.windowHeight);
        vm.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        })
        // vm.setData({
        //   windowWidth: res.windowWidth,
        //   windowHeight: res.windowHeight
        // });
      }
    })

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
})