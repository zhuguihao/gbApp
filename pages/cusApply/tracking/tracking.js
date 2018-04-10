// pages/cusApply/tracking/tracking.js
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 公司信息
     */
    companyList: null,
    /**
     * 客户绑定快递单信息
     * 1.运单号
     * 2.寄件人信息
     * 3.寄件人联系地址
     * 4.寄件人联系方式
     * 5.产品条形码
     */
    waybillNumber: null,
    addressee: null,
    address: null,
    addressPhone: null,
    barCode: null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let vm = this
    var barCode = JSON.parse(options.params).barCode;
    vm.setData({
      barCode: barCode
    })
    vm.getCommpanyAddress()
  },

  /**
    * 获取公司信息
    */
  getCommpanyAddress: function () {
    let vm = this
    util.postHttp("/productApplyQuery/getCommpanyAddress", {}, {
      success: res => {
        if ("success" == res.status) {
          vm.setData({
            companyList: res.data
          })
        }
      }
    })

  },

  /**
   * 绑定快递单号
   */
  bindWaybill: function (e) {
    this.setData({
      waybillNumber: e.detail.value
    })
  },

  /**
   * 绑定寄件人信息
   */
  bindAddressee: function (e) {
    this.setData({
      addressee: e.detail.value
    })
  },

  /**
   * 绑定寄件人联系地址
   */
  bindAddress: function (e) {
    this.setData({
      address: e.detail.value
    })
  },

  /**
   * 绑定寄件人联系方式
   */
  bindAddressPhone: function (e) {
    this.setData({
      addressPhone: e.detail.value
    })
  },

  /**
   * 提交快递单
   */
  bindSubmit: function () {
    let vm = this
    let data = vm.data

    console.log(data.waybillNumber)
    console.log(data.addressee)
    console.log(data.address)
    console.log(data.addressPhone)
    console.log(data.barCode)
    if (data.waybillNumber.length == 0) {
      wx.showToast({
        title: '请输入运单号',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (data.addressee.length == 0) {
      wx.showToast({
        title: '请输入寄件人信息',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (data.address.length == 0) {
      wx.showToast({
        title: '请输入寄件人联系地址',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (data.addressPhone.length == 0) {
      wx.showToast({
        title: '请输入寄件人联系方式',
        icon: 'none',
        duration: 2000
      })
      return
    }
    /**
     * 提交客户快递单信息
     */
    vm.applyWayBill()
  },
  /**
   * 提交运单号信息接口
   */
  applyWayBill: function () {
    let vm = this
    let data = vm.data
    let params = {
      barCode: data.barCode,
      addressee: data.addressee,
      address: data.address,
      addressPhone: data.addressPhone,
      waybillNumber: data.waybillNumber,
    }
    util.postHttp("/productApply/applyWayBill", params, {
      success: res => {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          mask: true,
          duration: 2000
        })
        if ("success" == res.status) {
          console.log(res.data)
          setTimeout(function () {
            wx.reLaunch({
              url: '../../homePage/homePage',
            })
          }, 2000)
        }
      }
    })
  },
})