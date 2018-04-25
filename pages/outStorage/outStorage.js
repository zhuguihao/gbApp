// pages/outStorage/outStorage.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * A：显示出库界面
     * B：展示详情界面
     */
    outStorageShow: 'A',
    /**
     * 出库列表数据
     */
    outStorageProList: [],
    /**
     * 出库详情单
     */
    productSaleDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
  },
  /**
   * 初始化当天当前操作者的出库记录
   */
  init: function () {
    let vm = this
    util.postHttp("/productSale/getOutStorageByUser", {}, {
      success: res => {
        if ("success" == res.status) {
          this.setData({
            outStorageProList: res.data
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
      // onlyFromCamera: true,// 只允许从相机扫码
      success: (res) => {
        wx.hideLoading();
        // if ("CODE_128" == res.scanType) {//条形码
          /**
           * 条形码
           * 进行出库操作
           */
          let params = {
            barCode: res.result
          }

          util.postHttp("/productSale/outStorage", params, {
            success: res => {
              if ("success" == res.status) {
                let data = vm.data.outStorageProList
                data.unshift(res.data)
                this.setData({
                  outStorageProList: data
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

        // } else {
        //   wx.showModal({
        //     title: '提示',
        //     content: '识别失败，请重试！',
        //     showCancel: false
        //   })
        // }
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
  },
  /**
    * 界面展示控制
    */
  clickStorage: function (e) {
    var vm = this

    if ("A" == e.currentTarget.dataset.page) {
      this.setData({
        outStorageShow: e.currentTarget.dataset.page
      });
    }

    /**
     * 点击详情的时候
     */
    if ("B" == e.currentTarget.dataset.page) {
      this.setData({
        outStorageShow: e.currentTarget.dataset.page,
        productSaleDetail: vm.data.outStorageProList[e.currentTarget.dataset.index]
      });
    }

  },
  /**
     * 删除当前的出库信息
     */
  delStorage: function (e) {
    let vm = this
    console.log(e.currentTarget.dataset.id)
    var params = {
      id: e.currentTarget.dataset.id
    }
    util.postHttp("/productSale/delOutStorage", params, {
      success: res => {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
        if ("success" == res.status) {
          console.log(res.data)
          let data = vm.data.outStorageProList;
          data.splice(e.currentTarget.dataset.index, 1)
          console.log(data)
          this.setData({
            outStorageProList: data
          });
        }
      }
    })
  },
})