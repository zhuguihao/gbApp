Page({
  data: {
    /**
     * 输入框的属性
     */
    inputAttribute: {
      "placeholder": "未扫码成功，请手动填写流水号"
    },
    /**
     * 产品信息
     */
    productInfo: [{
      "title": "系列",
      "text": "IE系列经济型手工焊机"
    }, {
      "title": "产品名称",
      "text": "1P/3P均可接用 宽电压直流电焊机"
    }, {
      "title": "型号",
      "text": "IE 255D"
    }, {
      "title": "电压范围",
      "text": "150V~510V"
    }, {
      "title": "经销价",
      "text": "469"
    }, {
      "title": "零售价",
      "text": "599"
    }, {
      "title": "政策",
      "text": "1年包换"
    }, {
      "title": "功能",
      "text": "单相三相发电机均可用￠3.2-100M持续焊 单相三相发电机均可用￠3.2-100M持续焊 单相三相发电机均可用￠3.2-100M持续焊 单相三相发电机均可用￠3.2-100M持续焊发电机均可用￠3.2-100M持续焊 单相三相发电机均可用￠3.2-100M持续焊 单相三相发电机均可用￠3.2-100M持续焊发电机均可用￠3.2-100M持续焊 单相三相发电机均可用￠3.2-100M持续焊 单相三相发电机均可用￠3.2-100M持续焊"
    }],
    /**
     * 流水号
     */
    scanCode: ""
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
      onlyFromCamera: true,// 只允许从相机扫码
      success: (res) => {
        wx.hideLoading();
        // if ("QR_CODE" == res.scanType) {//二维码
        //   vm.setData({
        //     scanCode: res.result
        //   })
        //   return
        // } else 
        if ("CODE_128" == res.scanType) {//条形码
          vm.setData({
            scanCode: res.result
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '暂不支持该类型二维码',
            showCancel: false
          })
          return
        }
        wx.showToast({
          title: '正在查询产品信息',
          icon: 'loading',
          duration: 2000
        })
      },
      fail: (res) => {
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '暂不支持该类型二维码',
          showCancel: false
        })
      },
      //接口调用结束的回调函数（调用成功、失败都会执行）
      complete: () => {
        console.log("接口调用结束的回调函数（调用成功、失败都会执行）");
      }
    })
  }
})