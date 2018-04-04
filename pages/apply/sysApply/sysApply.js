// pages/apply/sysApply/sysApply.js
const util = require('../../../utils/util.js')
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
     * 售后单
     */
    applyList: [],
    /**
     * tabs切换页
     */
    tabsIndex: 0,
    isShow: false,
    /**
     * 屏幕宽度
     */
    sysWidth: null,
    /**
     * 屏幕高度
     */
    sysHeight: null,
    /**
     * 列表下标
     */
    listIndex: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let vm = this
    wx.getSystemInfo({
      success: function (res) {
        vm.setData({
          sysWidth: res.screenWidth,
          sysHeight: res.screenHeight
        })
      },
    })

    vm.sysApply()
  },
  /**
   * 查询售后中心信息
   */
  sysApply: function () {
    util.postHttp("/productApplyQuery/sysApply", {}, {
      success: res => {
        if ("success" == res.status) {
          console.log(res.data)
          this.setData({
            applyList: res.data
          });
        }
      }
    })
  },
  upper: function (e) {
    let vm = this
    console.log(e)
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    vm.setData({
      isShow: true
    })

    setTimeout(function () {

      wx.hideLoading()
      /**
       * 阻止下拉事件
       */
      vm.setData({
        isShow: false
      })

    }, 2000)
  },
  /**
   * 点击tab标题
   */
  changeIndex: function (e) {
    this.setData({
      tabsIndex: e.currentTarget.dataset.index
    })
  },
  /**
   * 切换tab
   */
  switchTab: function (e) {
    console.log(e)
    this.setData({
      tabsIndex: e.detail.current
    });
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
    })
  },

})