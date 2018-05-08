
const utils = require('../../lib/utils.js')
const qcloud = require('./../../bower_components/wafer-client-sdk/index.js');

const config = require("../../config.js");

const app = getApp()

// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomList: [],
    firstshow: true,
    isGetLoginInfo: false,
    tapTime: ''  // 防止两次点击操作间隔太快 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad', options)
    var self = this 

    wx.showLoading({
      title: '登录信息获取中',
    })

    qcloud.request({
      login:true,
      url: config.service.host + '/api/user',
      method: 'post',
      success: (res) => {
        let userInfo = res.data.message.user
        app.globalData.userInfo = userInfo
        self.data.firstshow = false
        self.data.isGetLoginInfo = true
        wx.hideLoading()
        self.getRoomList()
      },
      fail: (err) => {
        self.data.isGetLoginInfo = false;
        wx.hideLoading();
        wx.showModal({ title: '登录失败', content: JSON.stringify(error), showCancel: false })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let self = this
    wx.setKeepScreenOn({
      keepScreenOn: true
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow')

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload')
   
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  getRoomList: function() {
    var self = this;

    if (!self.data.isGetLoginInfo){
      wx.showModal({
        title: '提示',
        content: '登陆信息初始化中, 请稍后再试',
        showCancel: false
      })
      return;
    }


    qcloud.request({
      login: true,
      url: config.service.host + '/api/room/list',
      method: 'post',
      success: res => {
        let rooms = res.data.message.rooms
        
        self.setData({
          roomList: rooms
        })

        console.log("获得房间列表成功", rooms)
      },
      fail(error) {
        wx.hideToast()
        wx.showModal({ title: '登录失败', content: JSON.stringify(error), showCancel: false })
      },
    })

  },

  create: function() {
    let self = this
    let nowTime = new Date()
    if(nowTime - self.data.tapTime < 500){
      return
    }
    
    if (!self.data.isGetLoginInfo) {
      wx.showModal({
        title: '提示',
        content: '登陆信息初始化中, 请稍后再试',
        showCancel: false
      })
      return
    }

    let url = '../createroom/createroom'

    wx.navigateTo({
      url: url,
    })

    self.setData({tapTime: nowTime})
  },

  goRoom: function(e) {
    let self = this
    let nowTime = new Date()
    if (nowTime - self.data.tapTime < 500) {
      return
    }
    let url = '../room/room?roomID=' + e.currentTarget.dataset.roomid 
    wx.navigateTo({
      url: url,
    })

    self.setData({ tapTime: nowTime })
  }
})