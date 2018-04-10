// pages/scanPage/scanPage.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 扫码帮助图片
     */
    propagandaMapImg: "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg",
    /**
     * 首次填单地址
     */
    cusApplyUrl: "../cusApply/cusApply",
    /**
     * 填写快递信息
     */
    trackingUrl: "../cusApply/tracking/tracking",
    /**
     * 售后单状态
     */
    applyStatus: null,
    /**
     * 产品编号
     */
    barCode: null,
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
        if ("CODE_128" == res.scanType) {//条形码
          /**
             * 1.不存在申请中的条形码
             * 2.存在申请中的条形码
             *    1.被驳回 ---  重新填单
             *    （跳转到申请单填写页面）
             *    2.初审状态
             *    （跳转到结果页------提示客户正在初审，请等待）
             *    3.其他流程步骤
             *    （需要补充）
             * 3.当前的条形码其他人员正在操作（需要询问客户具体操作）
             * （跳转到帮助页面）
             * 跳转页面
           */
          var params = {
            "barCode": res.result
          };

          util.postHttp("/productApply/checkStatus", params, {
            success: data => {
              if ("success" == data.status) {
                console.log(JSON.stringify(data.data))
                vm.setData({
                  applyStatus: data.data.applyStatus,
                  barCode: res.result
                })
                vm.applyStatusPage();
              } else {
                wx.showToast({
                  title: data.msg,
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })


        } else {
          wx.showModal({
            title: '提示',
            content: '识别失败，请重试！',
            showCancel: false
          })
        }
      },
      fail: (res) => {
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '识别失败，请重试！',
          showCancel: false
        })
      },
      //接口调用结束的回调函数（调用成功、失败都会执行）
      complete: () => {
        console.log("接口调用结束的回调函数（调用成功、失败都会执行）");
      }
    })
  },
  applyStatusPage: function () {
    let vm = this
    console.log(vm.data.applyStatus);
    console.log(vm.data.barCode);
    /**
     * 为空新建
     */
    if ('first_trial' == vm.data.applyStatus) {
      /**
       * 等待初审
       */
      wx.showModal({
        title: '温馨提醒',
        content: '当前的产品提交的售后申请正在审批中，请等待',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else if ('the_trial_reject' == vm.data.applyStatus) {
      /**
       * 等待初审
       */
      wx.showModal({
        title: '温馨提醒',
        content: '当前的产品提交的售后申请被拒绝',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else if ('courier_tracking' == vm.data.applyStatus) {
      /**
       * 等待初审
       */
      wx.showModal({
        title: '温馨提醒',
        content: '您的快递暂未收到，请稍等',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else if ('aftersale_department' == vm.data.applyStatus) {
      /**
       * 等待初审
       */
      wx.showModal({
        title: '温馨提醒',
        content: '您的产品正在维修，请稍等',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else if ('the_trial_pass' == vm.data.applyStatus) {
      /**
       * 初审通过
       * 跳转到填写快递单流程
       */
      let params = {
        barCode: vm.data.barCode
      }
      wx.navigateTo({
        url: vm.data.trackingUrl + "?params=" + JSON.stringify(params)
      })
    } else if ('company_courier_tracking' == vm.data.applyStatus) {
      /**
       * 公司已经将产品维修好，需要确认收件
       */
      wx.navigateTo({
        url: vm.data.cusApplyUrl + "?params=" + JSON.stringify(params),
      })
    } else {
      let params = {
        barCode: vm.data.barCode
      }
      wx.navigateTo({
        url: vm.data.cusApplyUrl + "?params=" + JSON.stringify(params),
      })
    }
  }
})