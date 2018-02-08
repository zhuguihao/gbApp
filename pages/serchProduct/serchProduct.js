const app = getApp();
const util = require('../../utils/util.js')
Page({
  data: {
    /**
     * 输入框的属性
     */
    inputAttribute: {
      "placeholder": "未扫码成功，请手动填写流水号"
    },
    /**
     * 产品信息
     */
    productInfo: {},
    /**
     * 流水号
     */
    scanCode: ""
  },
  /**
   * 清空输入框
   */
  inpClear: function (e) {
    console.log(111111);
    this.setData({
      scanCode: ""
    });
  },
  /**
   * 扫码输入框事件
   */
  scanInput: function (e) {
    this.setData({
      scanCode: e.detail.value
    });
  },
  /**
   * 查询产品接口
   */
  productSerch: function () {
    var vm = this;
    console.log(this.data.scanCode);
    var params = {
      "barCode": this.data.scanCode
    }
    console.log(params)

    util.postHttp("/cusProuctQuery/getProductInfoByBarcode", params, {
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

    return
    wx.showLoading({
      title: '查询中，请稍后',
      mask: true
    })
    wx.request({
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      url: app.globalData.reqIp + "/getProductInfoByBarcode",
      data: params,
      success: function (res) {
        var data = res.data;
        console.log(vm.data.productInfo);
        console.log(vm.data.productInfo.length);
        if ("success" == data.status) {
          vm.setData({
            productInfo: data.data
          });
          console.log(vm.data.productInfo);
          console.log(vm.data.productInfo.length);
        }
      },
      fail: function (res) {
        console.log(res.data)
      },
      complete: function (res) {
        wx.hideLoading();
      }
    })
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
        console.log(res.scanType);
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

        this.productSerch();
      },
      fail: (res) => {
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '识别失败，请重试！',
          showCancel: false
        })
      }
    })
  }
})