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
      "url":"www.baidu.com",
      "name":"查询产品",
      "bgImage":""
    }, {
      "url": "www.baidu.com",
      "name": "主页",
      "bgImage": ""
    }, {
      "url":"www.baidu.com",
      "name":"设置",
      "bgImage":""
    }],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 10000,
    duration: 100
  },
  navigateTo(url,params){
    wx.navigateTo({
      url: url + params//'test?id=1'
    })
  }
})
