//logs.js
const util = require('../../utils/util.js')
Page({
  data: {
    imgUrls: [
      'https://gb.zhuguihao.com/image/baner01.jpg',
      'https://gb.zhuguihao.com/image/baner02.jpg'
    ],
    homePageMenu: [
      //   {
      //   "pageUrl": "../companyIndex/companyIndex",
      //   "name": "主页",
      //   "bgImage": "",
      //   "params": { "a": "1", "b": "2" }
      // }, {
      //   "pageUrl": "../storage/storage",
      //   "name": "入库",
      //   "bgImage": "",
      //   "params": {}
      // }, {
      //   "pageUrl": "../outStorage/outStorage",
      //   "name": "出库",
      //   "bgImage": "",
      //   "params": {}
      // }, {
      //   "pageUrl": "../product/sold/sold",
      //   "name": "售出",
      //   "bgImage": "",
      //   "params": { "a": "1", "b": "2" }
      // }, {
      //   "pageUrl": "../serchProduct/serchProduct",
      //   "name": "查询",
      //   "bgImage": "",
      //   "params": { "a": "1", "b": "2" }
      // }, {
      //   "pageUrl": "../scanPage/scanPage",
      //   "name": "售后",
      //   "bgImage": "",
      //   "params": { "a": "1", "b": "2" }
      // }, {
      //   "pageUrl": "../apply/sysApply/sysApply",
      //   "name": "售后中心",
      //   "bgImage": "",
      //   "params": {}
      // }
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 10000,
    duration: 100
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getMenu()
  },
  pageNavigateTo(e) {
    var vm = this;
    var homePageMenu = e.currentTarget.dataset.item;
    var menuUrl = homePageMenu.menuUrl;
    console.log(menuUrl)
    if ("" == menuUrl) {
      wx.showModal({
        title: '提示',
        content: '此功能暂未开放，敬请期待',
        showCancel: false
      })
      return
    }
    var params = homePageMenu.menuParams;
    console.log(params);
    wx.navigateTo({
      url: menuUrl + "?params=" + JSON.stringify(params)
    })
  },
  /**
    * 获取当前客户的菜单列表
    */
  getMenu: function () {
    let vm = this
    util.postHttp("/menu/getMenu", {}, {
      success: res => {
        if ("success" == res.status) {
          vm.setData({
            homePageMenu: res.data
          })
        }
      }
    })

  },
})
