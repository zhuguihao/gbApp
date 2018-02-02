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
    proList: [],
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
    proListDetail: {},
    /**
     * 入库列表数据
     */
    storageProList: [],
    /**
     * 入库界面URL
     */
    storageScanUrl: "./storageScan/storageScan"
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
    var id = proList[vm.data.proSeriesIndex].descendant[vm.data.proNameIndex].descendant[vm.data.proIndex].id
    if (!id) {
      wx.showToast({
        title: '请先添加产品型号',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if ("C" == e.currentTarget.dataset.page) {
      wx.navigateTo({
        url: vm.data.storageScanUrl + "?id=" + id
      })
      return
    } else if ("B" == e.currentTarget.dataset.page) {
      vm.getProductById(id)
      // return
    }
    this.setData({
      storageShow: e.currentTarget.dataset.page
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
  },
  /**
   * 获取产品ID获取产品信息
   */
  getProductById: function (id) {
    var vm = this;
    var params = {
      id: id
    };
    util.postHttp("/product/getProductById", params, {
      success: res => {
        if ("success" == res.status) {
          console.log(JSON.stringify(res.data))
          this.setData({
            proListDetail: res.data
          })
        }
      }
    })
  }
})