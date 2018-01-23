// pages/storage/storage.js
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
    proList: [{ "code": "001", "name": "产品的系列", "list": [{ "code": "001", "name": "产品名称", "list": [{ "code": "001", "name": "产品型号" }, { "code": "002", "name": "产品型号2" }, { "code": "003", "name": "产品型号3" }] }, { "code": "02", "name": "产品名称2", "list": [{ "code": "001", "name": "产品型号" }, { "code": "002", "name": "产品型号2" }, { "code": "003", "name": "产品型号3" }] }, { "code": "003", "name": "产品名称3", "list": [{ "code": "001", "name": "产品型号" }, { "code": "002", "name": "产品型号2" }, { "code": "003", "name": "产品型号3" }] }] }, { "code": "002", "name": "产品的系列2", "list": [{ "code": "002", "name": "产品名称2", "list": [{ "code": "001", "name": "产品型号" }, { "code": "002", "name": "产品型号2" }, { "code": "003", "name": "产品型号3" }] }, { "code": "02", "name": "产品名称2", "list": [{ "code": "001", "name": "产品型号" }, { "code": "002", "name": "产品型号2" }, { "code": "003", "name": "产品型号3" }] }, { "code": "003", "name": "产品名称3", "list": [{ "code": "003", "name": "产品型号3" }, { "code": "002", "name": "产品型号2" }, { "code": "003", "name": "产品型号3" }] }] }, { "code": "003", "name": "产品的系列3", "list": [{ "code": "001", "name": "产品名称", "list": [{ "code": "001", "name": "产品型号" }, { "code": "002", "name": "产品型号2" }, { "code": "003", "name": "产品型号3" }] }, { "code": "02", "name": "产品名称2", "list": [{ "code": "001", "name": "产品型号" }, { "code": "002", "name": "产品型号2" }, { "code": "003", "name": "产品型号3" }] }, { "code": "003", "name": "产品名称3", "list": [{ "code": "001", "name": "产品型号" }, { "code": "002", "name": "产品型号2" }, { "code": "003", "name": "产品型号3" }] }] }],
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
    storageShow: 'A'
  },
  /**
   * 切换扫码入库状态值
   */
  clickStorage: function(e) {
    this.setData({
      storageShow: e.currentTarget.dataset.page
    });
  },
  bindStorageScan: function(){
    console.log("点击了扫码")
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
    vm.data.proList;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  }
})