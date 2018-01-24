// pages/storage/storage.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 产品系列下拉框配置 下标
     */
    proSeriesIndex: 0,
    /**
     * 产品名称下拉框配置 下标
     */
    proNameIndex: 0,
    /**
     * 产品型号下拉框配置 下标
     */
    proIndex: 0,
    /**
     * 产品信息数组
     */
    proList: [
      // { "code": "001", "name": "产品的系列", "list": [{ "code": "001", "name": "产品名称", "list": [{ "code": "001", "name": "产品型号" }, { "code": "002", "name": "产品型号2" }, { "code": "003", "name": "产品型号3" }] }, { "code": "02", "name": "产品名称2", "list": [{ "code": "001", "name": "产品型号" }, { "code": "002", "name": "产品型号2" }, { "code": "003", "name": "产品型号3" }] }, { "code": "003", "name": "产品名称3", "list": [{ "code": "001", "name": "产品型号" }, { "code": "002", "name": "产品型号2" }, { "code": "003", "name": "产品型号3" }] }] }, { "code": "002", "name": "产品的系列2", "list": [{ "code": "002", "name": "产品名称2", "list": [{ "code": "001", "name": "产品型号" }, { "code": "002", "name": "产品型号2" }, { "code": "003", "name": "产品型号3" }] }, { "code": "02", "name": "产品名称2", "list": [{ "code": "001", "name": "产品型号" }, { "code": "002", "name": "产品型号2" }, { "code": "003", "name": "产品型号3" }] }, { "code": "003", "name": "产品名称3", "list": [{ "code": "003", "name": "产品型号3" }, { "code": "002", "name": "产品型号2" }, { "code": "003", "name": "产品型号3" }] }] }, { "code": "003", "name": "产品的系列3", "list": [{ "code": "001", "name": "产品名称", "list": [{ "code": "001", "name": "产品型号" }, { "code": "002", "name": "产品型号2" }, { "code": "003", "name": "产品型号3" }] }, { "code": "02", "name": "产品名称2", "list": [{ "code": "001", "name": "产品型号" }, { "code": "002", "name": "产品型号2" }, { "code": "003", "name": "产品型号3" }] }, { "code": "003", "name": "产品名称3", "list": [{ "code": "001", "name": "产品型号" }, { "code": "002", "name": "产品型号2" }, { "code": "003", "name": "产品型号3" }] }] }
    ],
    /**
     * 下拉图标地址
     */
    selectImgSrc: '../../static/logo/select.png',
    /**
     * 入库单和出库单切换开关
     * A:生成出库单
     * B:生成入库单
     * C:扫码入库
     */
    storageShow: 'A',
    /**
     * 生成入库单的详情列表
     */
    proListDetail: {
      "series": "IE系列经济型手工焊机",
      "name": "1P直流电焊机",
      "model": "IE 225",
      "voltageRange": "150V~270V",
      "distributionPrice": 319,
      "retailPrice": 399,
      "desc": "￠2.5-100M持续焊，￠3.2-5M",
      "policy": 2,
      "policy_replace": 1
    },
    /**
     * 入库列表数据
     */
    storageProList: []
  },
  /**
   * 切换扫码入库状态值
   */
  clickStorage: function (e) {
    var vm = this
    var proList = vm.data.proList;
    if (!proList[vm.data.proSeriesIndex]) {
      wx.showToast({
        title: '请先添加产品系列',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!proList[vm.data.proSeriesIndex].descendant[vm.data.proNameIndex]) {
      wx.showToast({
        title: '请先添加产品名称',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!proList[vm.data.proSeriesIndex].descendant[vm.data.proNameIndex].descendant[vm.data.proIndex]) {
      wx.showToast({
        title: '请先添加产品型号',
        icon: 'none',
        duration: 2000
      })
      return
    }
    var proListDetail = {

    };
    this.setData({
      storageShow: e.currentTarget.dataset.page,
      // proListDetail: proListDetail
    });
  },
  bindStorageScan: function () {
    var vm = this
    console.log("点击了扫码")
    var proListDetail = {
      "barCode": new Date,
      "series": "IE系列经济型手工焊机",
      "name": "1P直流电焊机",
      "model": "IE 225",
      "voltageRange": "150V~270V",
      "distributionPrice": 319,
      "retailPrice": 399,
      "desc": "￠2.5-100M持续焊，￠3.2-5M",
      "policy": 2,
      "policy_replace": 1
    }
    var data = vm.data.storageProList
    data.unshift(proListDetail)
    this.setData({
      storageProList: data
    });
  },
  /**
   * 产品系列下拉框
   */
  bindProSeriesChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      proSeriesIndex: e.detail.value,
      proNameIndex: 0,
      proIndex: 0
    })
  },
  /**
   * 产品名称下拉框
   */
  bindProNameChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      proNameIndex: e.detail.value,
      proIndex: 0
    })
  },
  /**
   * 产品型号下拉框
   */
  bindProChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      proIndex: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var vm = this;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getProductList();
  },
  /**
   * 获取产品信息
   */
  getProductList: function () {
    var vm = this;
    util.postHttp("/product/getAllProductCascade", {}, {
      success: res => {
        if ("success" == res.status) {
          this.setData({
            proList: res.data
          })
        }
      }
    })
  }
})