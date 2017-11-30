//logs.js
const util = require('../../utils/util.js')
Page({
  data: {
    imgUrls:  [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    homePageMenu: [{
      "pageUrl": "../serchProduct/serchProduct",
      "name": "查询",
      "bgImage": "",
      "params": { "a": "1", "b": "2" }
    }, {
      "pageUrl": "",
      "name": "主页",
      "bgImage": "",
      "params": { "a": "1", "b": "2" }
    }, {
      "pageUrl": "../personalSettings/personalSettings",
      "name": "设置",
      "bgImage": "",
      "params": { "a": "1", "b": "2" }
    }, {
      "pageUrl": "../cusApply/cusApply",
      "name": "售后",
      "bgImage": "",
      "params": { "a": "1", "b": "2" }
    }, {
      "pageUrl": "",
      "name": "卖出产品",
      "bgImage": "",
      "params": { "a": "1", "b": "2" }
    }],
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
