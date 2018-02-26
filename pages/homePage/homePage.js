//logs.js
const util = require('../../utils/util.js')
Page({
  data: {
    imgUrls: [
      'https://gb.zhuguihao.com/image/baner01.jpg',
      'https://gb.zhuguihao.com/image/baner02.jpg'
    ],
    homePageMenu: [{
      "pageUrl": "../companyIndex/companyIndex",
      "name": "主页",
      "bgImage": "",
      "params": { "a": "1", "b": "2" }
    }, {
      "pageUrl": "../storage/storage",
      "name": "入库",
      "bgImage": "",
      "params": {}
    }, {
      "pageUrl": "../outStorage/outStorage",
      "name": "出库",
      "bgImage": "",
      "params": {}
    }, {
      "pageUrl": "../product/sold/sold",
      "name": "售出",
      "bgImage": "",
      "params": { "a": "1", "b": "2" }
    }, {
      "pageUrl": "../serchProduct/serchProduct",
      "name": "查询",
      "bgImage": "",
      "params": { "a": "1", "b": "2" }
    }, {
      "pageUrl": "../scanPage/scanPage",
      "name": "售后",
      "bgImage": "",
      "params": { "a": "1", "b": "2" }
    }, {
      "pageUrl": "../apply/sysApply/sysApply",
      "name": "售后中心",
      "bgImage": "",
      "params": {}
    }
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 10000,
    duration: 100
  },
  pageNavigateTo(e) {
    var vm = this;
    var homePageMenu = e.currentTarget.dataset.item;
    var pageUrl = homePageMenu.pageUrl;
    if ("" == pageUrl) {
      wx.showModal({
        title: '提示',
        content: '此功能暂未开放，敬请期待',
        showCancel: false
      })
      return
    }
    var params = homePageMenu.params;
    console.log(params);
    wx.navigateTo({
      url: pageUrl + "?params=" + JSON.stringify(params)
    })
  }
})
