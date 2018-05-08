
const config = require('./config')
const qcloud = require("./bower_components/wafer-client-sdk/index.js")

App({
  onLaunch: function () {
    var logs = wx.getStorageSync('logs') || []

    qcloud.setLoginUrl(config.service.loginUrl)

   
  },
  globalData: {
    userInfo: null,
    config: config
  },
  onShow: function(options) {
    console.log('onShow', options)
  },
  onHide: function() {
    console.log('onHide')
  },
  onError: function() {
  }
})