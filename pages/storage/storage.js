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
     */
    storageShow: true
  },
  /**
   * 切换入库单和出库单
   */
  clickStorageBill: function (e) {
    this.setData({
      storageShow: !this.data.storageShow
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
    vm.data.proList;
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