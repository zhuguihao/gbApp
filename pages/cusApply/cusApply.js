// pages/customerService.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 损坏点
     */
    damagePointList: [
      {
        id: 0,
        name: '电路损坏'
      },
      {
        id: 1,
        name: '插头损坏'
      },
      {
        id: 2,
        name: '不能使用'
      },
      {
        id: 3,
        name: '机箱破损'
      }
    ],

    /**
     * 提交时候的参数
     * 条形码：scanCode
     * 报修：damagePoint
     * 姓名：name
     * 联系方式：phone
     */
    barCode: '',
    damagePoint: '',
    name: '',
    phone: '',
    /**
     * 添加故障图片默认图
     */
    defultImgSrc: '../../static/logo/add.png',
    /**
     * 1.选中的图片
     * 2.可选图片数量
     * 3.是否显示添加图片按钮
     */
    imageUrls: [],
    selImageNum: 3,
    addImageShow: true,
  },
  /**
   * 选择图片
   */
  chooseImage() {
    let vm = this;
    wx.chooseImage({
      count: vm.data.selImageNum,
      success: function (res) {
        console.log(JSON.stringify(res.tempFilePaths))
        console.log(vm.data.selImageNum)
        let imageUrls = vm.data.imageUrls
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          imageUrls.push(res.tempFilePaths[i])
        }
        console.log(JSON.stringify(imageUrls))
        vm.setData({
          imageUrls: imageUrls,
          selImageNum: vm.data.selImageNum - res.tempFilePaths.length,
          addImageShow: vm.data.selImageNum - res.tempFilePaths.length > 0
        })
      }
    })
  },
  /**
   * 删除选中的图片
   */
  delPreviewImage(e) {
    let vm = this
    console.log(JSON.stringify(e.currentTarget.dataset.imageindex))
    let imageUrls = vm.data.imageUrls
    wx.showActionSheet({
      itemList: ['删除'],
      success: function (res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          imageUrls.splice(e.currentTarget.dataset.imageindex, 1);
          console.log(JSON.stringify(imageUrls))
          vm.setData({
            imageUrls: imageUrls,
            selImageNum: vm.data.selImageNum + 1,
            addImageShow: true
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })

  },
  /**
  * 展示图片
  */
  previewImage(e) {
    console.log(JSON.stringify(e.currentTarget.dataset.imageindex))
    let imageUrls = this.data.imageUrls
    console.log(JSON.stringify(imageUrls))
    if (imageUrls.length < 1) return
    wx.previewImage({
      current: imageUrls[e.currentTarget.dataset.imageindex],
      urls: imageUrls,
    })
  },
  /**
   * 绑定姓名
   */
  bindName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  /**
   * 绑定联系方式
   */
  bindPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  /**
   * 申请提交
   */
  bindSubmit: function () {
    let vm = this
    
    let data = vm.data
    
    console.log(vm.data.name)
    console.log(vm.data.damagePoint)
    console.log(vm.data.barCode)
    console.log(vm.data.phone)
    if (data.damagePoint.length == 0) {
      wx.showToast({
        title: '请选择故障点',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (data.name.length == 0) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (data.phone.length == 0) {
      wx.showToast({
        title: '请输入联系方式',
        icon: 'none',
        duration: 2000
      })
      return
    }

    vm.subApply()
  },

  /**
   * 初始化界面
   */
  onLoad: function (options) {

    if (options.params) {
      var barCode = JSON.parse(options.params).barCode;
      this.setData({
        barCode: barCode
      })
    }
  },
  /**
  * 提交初审
  */
  subApply: function () {
    let vm = this
    
    let params = {
      cusName: vm.data.name,
      cusTelphone: vm.data.phone,
      faultPoint: vm.data.damagePoint,
      barCode: vm.data.barCode
    }

    util.postHttp("/productApply/subApply", params, {
      success: res => {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
        if ("success" == res.status) {
          /**
           * 上传故障图
           */
          let applyId = res.data.applyId
          for (let i = 0; i < vm.data.imageUrls.length; i++) {
            console.log(vm.data.imageUrls[i])
            vm.applyImage(vm.data.imageUrls[i], i, applyId)
          }

          wx.reLaunch({
            url: '../homePage/homePage',
          })
          return
        }
      }
    })

  },
  /**
   * 上传文件
   */
  applyImage(fileUrl, index, applyId) {
    let vm = this

    let params = {
      applyId: applyId,
      fileUrl: fileUrl
    }
    console.log(getApp().globalData.reqIp)
  
    util.upload('/productApply/applyImage', params, {
      success: res => {
        console.log(JSON.stringify(res))
      }
    })

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
        // if ("QR_CODE" == res.scanType) {//二维码
        //   vm.setData({
        //     scanCode: res.result
        //   })
        //   return
        // } else 
        // if ("CODE_128" == res.scanType) {//条形码
        vm.setData({
          scanCode: res.result
        })
        // } else {
        //   wx.showModal({
        //     title: '提示',
        //     content: '识别失败，请重试！',
        //     showCancel: false
        //   })
        //   return
        // }
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
  /**
   * 损坏点
   */
  bindDamagePointChange: function (e) {
    var vm = this;
    var index = e.detail.value;
    this.setData({
      index: index,
      damagePoint: vm.data.damagePointList[index].name
    })
  },
})