// pages/storage/storageScan/storageScan.js
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
      * 入库单和出库单切换开关
      * A:生成出库单
      * B:生成入库单
      * C:扫码入库
      */
    storageShow: 'C',
    /**
     * 入库列表数据
     */
    storageProList: [],
    /**
     * 选择产品URL
     */
    storageUrl: "../storage/storage",
    /**
     * 产品ID
     */
    id: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      id: options.id
    });
  },

  /**
   * 点击重新入库
   */
  clickStorage: function (e) {
    var vm = this
    if ("A" == e.currentTarget.dataset.page) {
      wx.navigateTo({
        url: vm.data.storageUrl
      })
      return
    }
    this.setData({
      storageShow: e.currentTarget.dataset.page
    });
  },
  /**
    * 扫码事件
    */
  bindStorageScan() {
    var vm = this;
    console.log("点击了扫码" + vm.data.id)
    wx.showLoading({
      title: '扫码中,请稍后..',
      mask: true
    });
    wx.scanCode({
      onlyFromCamera: true,// 只允许从相机扫码
      success: (res) => {
        wx.hideLoading();
        if ("CODE_128" == res.scanType) {//条形码
          var params = {
            barCode: res.result,
            productId: vm.data.id
          };
          // data.unshift(proListDetail)
          // this.setData({
          //   storageProList: data
          // });
          // return
          // wx.navigateTo({
          //   url: vm.data.cusApplyUrl + "?params=" + JSON.stringify(params),
          // })
          // return

          util.postHttp("/product/storage", params, {
            success: res => {
              wx.showToast({
                title: res.msg,
                icon: 'none',
                duration: 2000
              })
              if ("success" == res.status) {
                console.log(res.data)
              }
            }
          })

        } else {
          /**
           * 跳转到扫码结果页面
           */
          // wx.navigateTo({
          //   url: vm.data.cusApplyUrl + "?params=" + JSON.stringify(params),
          // })
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
})