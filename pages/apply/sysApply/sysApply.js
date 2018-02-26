// pages/apply/sysApply/sysApply.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 产品编号输入框默认
     */
    placeholder: {
      barCode: '请填写流水号'
    },
    /**
     * 产品编号
     */
    barCode: '',
    /**
     * 下拉图标
     */
    selectSrc: '../../../static/logo/select.png',
    /**
     * 加载更多图标
     */
    moreSrc: '../../../static/logo/loadMore.png',
    /**
     * 售后状态下标
     */
    applyStatusndex: 0,
    /**
     * 售后状态
     */
    applyStatusList: [{
      key: 'all',
      value: '查询所有审批状态'
    }, {
      key: 'first_trial',
      value: '售后人员初审'
    }, {
      key: 'two_trial',
      value: '售后人员'
    }],
    /**
     * 加载更多图标切换
     */
    loadMore: true,
  },
  /**
   * 切换更多图标事件
   */
  bindLoadMore: function () {
    this.setData({
      loadMore: !this.data.loadMore
    })
  },
  /**
   * 售后状态下拉事件
   */
  bindApplyStatusChange: function (e) {
    this.setData({
      applyStatusndex: e.detail.value
    })
  },
  /**
    * 扫码输入框事件
    */
  scanInput: function (e) {
    this.setData({
      barCode: e.detail.value
    });
  },
  /**
   * 清空输入框
   */
  inpClear: function (e) {
    this.setData({
      barCode: ''
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 下拉事件
   */
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    setTimeout(function () {
      wx.hideLoading()
      /**
       * 阻止下拉事件
       */
      wx.stopPullDownRefresh()
    }, 2000)
  },
})