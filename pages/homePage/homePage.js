//logs.js
const util = require('../../utils/util.js')
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    homePageMenu:[{
      "pageUrl":"../index/index",
      "name":"查询",
      "bgImage":"",
      "params": {"a":"1","b":"2"}
    }, {
      "pageUrl": "../index/index",
      "name": "主页",
      "bgImage": "",
      "params": { "a": "1", "b": "2" }
    }, {
      "pageUrl":"../index/index",
      "name":"设置",
      "bgImage": "",
      "params": { "a": "1", "b": "2" }
    }],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 10000,
    duration: 100
  },
  pageNavigateTo(e){
    var vm = this;
    var index = e.currentTarget.dataset.index;
    console.log(index);
    var homePageMenu = vm.data.homePageMenu[index];
    console.log(homePageMenu);
    var pageUrl = homePageMenu.pageUrl;
    console.log(pageUrl);
    var params = homePageMenu.params;
    console.log(params);
    wx.navigateTo({
      url: pageUrl + "?params=" + JSON.stringify(params)
    })
  }
})
