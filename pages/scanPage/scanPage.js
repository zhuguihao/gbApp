// pages/scanPage/scanPage.js
const util = require('../../utils/util.js')
Page({ 

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 扫码帮助图片
     */
    propagandaMapImg: "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg",
    /**
     * 首次填单地址
     */
    cusApplyUrl: "../cusApply/cusApply"
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
        if ("CODE_128" == res.scanType) {//条形码
          /**
             * 1.不存在申请中的条形码
             * 2.存在申请中的条形码
             *    1.被驳回 ---  重新填单
             *    （跳转到申请单填写页面）
             *    2.初审状态
             *    （跳转到结果页------提示客户正在初审，请等待）
             *    3.其他流程步骤
             *    （需要补充）
             * 3.当前的条形码其他人员正在操作（需要询问客户具体操作）
             * （跳转到帮助页面）
             * 跳转页面
           */
          var params = {
            "barCode": res.result
          };

          util.postHttp("/productApply/checkStatus", params, {
            success: res => {
              if ("success" == res.status) {
                console.log(JSON.stringify(res.data))
                vm.setData({
                  productInfo: res.data
                })
              } else {
                wx.showToast({
                  title: res.msg,
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })

          wx.navigateTo({
            url: vm.data.cusApplyUrl + "?params=" + JSON.stringify(params),
          })
          return


          wx.showLoading({
            title: '正在查询产品信息...',
            mask: true
          })
          wx.request({
            url: 'test.php', //仅为示例，并非真实的接口地址
            data: {
              x: '',
              y: ''
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log("success:" + res.data)
            },
            fail: function (res) {
              console.log("fail:" + res.data)
            },
            complete: function () {
              wx.hideLoading();
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '识别失败，请重试！',
            showCancel: false
          })
        }
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

  }
})