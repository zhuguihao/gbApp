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
    listIndex: null,
    /**
     * 拒绝弹窗
     */
    rejectModal: false,
    /**
     * 拒绝原因
     */
    rejResion: null,
    /**
     * 选中的申请单ID
     */
    id: null,
    /**
     * 初审弹窗开关
     */
    firstPassModal: false,
    /**
     * 下拉图标地址
     */
    selectImgSrc: '../../../static/logo/select.png',
    /**
     * 是否付费
     */
    isPayList: [{
      key: "N",
      value: "否"
    }, {
      key: "Y",
      value: "是"
    }],
    /**
     * 是否付费下标
     */
    isPayIndex: 0,
    /**
     * 是否需要填写付费产品开关
     */
    isPayGoods: false,
    /**
     * 维修状态列表
     */
    ApplyPolicyStateCodeList: null,
    /**
     * 维修状态列表下标
     */
    ApplyPolicyIndex: 0,
    /**
     * 1.待初审ID
     * 2.电话回访内容
     * 3.需要额外付费的产品信息
     */
    firstPassId: null,
    applyDesc: null,
    payGoods: null,
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
    vm.getApplyPolicyStateCode()
  },
  /**
   * 签收客户快递
   */
  signExpress(e){
    console.log(e.currentTarget.dataset.id)
    let vm = this
    let params = {
      productSaleApplyId: e.currentTarget.dataset.id
    }
    util.postHttp("/proApplySys/signExpress", params, {
      success: res => {
        if ("success" == res.status) {
          console.log(res.data)
          vm.setData({
            ApplyPolicyStateCodeList: res.data
          })
          vm.sysApply()
        }

      }
    })
  },
  /**
   * 驳回客户快递
   */
  rejExpress(e) {
    console.log(e.currentTarget.dataset.id)
    let vm = this
    let params = {
      productSaleApplyId: e.currentTarget.dataset.id
    }
    util.postHttp("/proApplySys/rejExpress", params, {
      success: res => {
        if ("success" == res.status) {
          console.log(res.data)
          vm.setData({
            ApplyPolicyStateCodeList: res.data
          })
          vm.sysApply()
        }
      }
    })
  },
  /**
   * 是否付费下拉框改变事件
   */
  bindIsPayChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      isPayIndex: e.detail.value,
      isPayGoods: "Y" == this.data.isPayList[e.detail.value].key,
    })
  },
  /**
   * 选择维修状态
   */
  bindApplyPolicyStateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      ApplyPolicyIndex: e.detail.value,
    })
  },
  /**
   * 初审按钮
   */
  ftPass: function (e) {
    let vm = this
    vm.setData({
      firstPassId: e.currentTarget.dataset.id,
      firstPassModal: true
    })
  },
  /**
   * 获取产品维修状态
   */
  getApplyPolicyStateCode: function () {
    let vm = this
    util.postHttp("/productApplyQuery/getApplyPolicyStateCode", {}, {
      success: res => {
        if ("success" == res.status) {
          console.log(res.data)
          vm.setData({
            ApplyPolicyStateCodeList: res.data
          })
        }

      }
    })
  },
  /**
   * 提交初审
   * 校验参数
   */
  subFirstPass: function () {
    let vm = this
    let data = vm.data
    if (data.applyDesc.length == 0) {
      wx.showToast({
        title: '请填写电话回访内容',
        icon: 'none',
        duration: 2000
      })
      return
    } else if ("Y" == data.isPayList[data.isPayIndex].key && data.payGoods.length == 0) {
      wx.showToast({
        title: '请填写额外付费的产品信息',
        icon: 'none',
        duration: 2000
      })
      return
    }
    vm.firstTrialPass()
  },
  /**
   * 初审通过
   */
  firstTrialPass: function () {
    let vm = this
    let data = vm.data
    let params = {
      productSaleApplyId: data.firstPassId,
      applyDesc: data.applyDesc,
      applyPolicyState: data.ApplyPolicyStateCodeList[data.ApplyPolicyIndex].key
    }
    if ("Y" == data.isPayList[data.isPayIndex].key) {
      params.isPay = data.isPayList[data.isPayIndex].key
      params.payGoods = data.payGoods
    }
    console.log(JSON.stringify(params))
    util.postHttp("/proApplySys/firstTrial", params, {
      success: res => {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          mask: true,
          duration: 2000
        })
        if ("success" == res.status) {
          console.log(res.data)
          vm.setData({
            firstPassModal: false,
          })
          console.log(data.isPayGoods)
          vm.sysApply()
        }

      }
    })
  },
  /**
   * 绑定拒绝原因
   */
  bindRejResion(e) {
    this.setData({
      rejResion: e.detail.value
    })
  },
  /**
   * 绑定电话回访内容
   */
  bindApplyDesc(e) {
    this.setData({
      applyDesc: e.detail.value
    })
  },
  /**
   * 绑定付费产品信息
   */
  bindPayGoods(e) {
    this.setData({
      payGoods: e.detail.value
    })
  },
  /**
   * 初审拒单
   */
  rejSubmit(e) {
    let data = this.data
    let vm = this
    console.log(data.rejResion)
    console.log(data.id)
    let params = {
      productSaleApplyId: data.id,
      applyRejectResion: data.rejResion
    }
    util.postHttp("/proApplySys/firstTrialReject", params, {
      success: res => {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          mask: true,
          duration: 2000
        })
        if ("success" == res.status) {
          console.log(res.data)
          vm.setData({
            rejectModal: !data.rejectModal
          })
          vm.sysApply()
        }

      }
    })
  },
  /**
   * 关闭拒单弹窗
   */
  rejCannal(e) {
    console.log(e)
    this.setData({
      rejectModal: !this.data.rejectModal,
      id: e.currentTarget.dataset.id
    })
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