// pages/createroom/createroom.js

const qcloud = require('./../../bower_components/wafer-client-sdk/index.js');
const config = require("../../config.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomName: '',   // 房间名称
    roomCover: '',  // 房间cover 
    tapTime: ''     // 防止两次点击间隔太快 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
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

  bindRoomName: function(e) {
    var self = this
    self.setData({
      roomName: e.detail.value 
    })
  },

  create: function() {
    let self = this
    let nowTime = new Date()
    if(nowTime - this.data.tapTime < 500) {
      return
    }
    if (/[<>*{}()^%$#@!~&= ]/.test(self.data.roomName)) {
      wx.showModal({
        title: '提示',
        content: '直播名字不能为空或包含特殊字符',
        showCancel: false
      });
      return;
    }

    qcloud.request({
      login: true,
      url: config.service.host + '/api/room/create',
      method: 'post',
      data: {
        subject: self.data.roomName,
        cover: self.data.roomCover
      },
      success: (res) => {
        console.log('roomcreate ', res.data.message)
        let roomInfo = res.data.message.room
        let url = '../room/room?type=create&roomId=' + roomInfo.id + '&roomName=' + roomInfo.subject
        
        wx.redirectTo({
          url: url,
        })

        wx.showToast({
          title: '进入直播',
          icon: 'success',
          duration: 1000
        })
      },
      fail: (err) => {
        wx.showModal({
          title: '提示',
          content: '直播创建失败,请稍后再试',
          showCancel: false
        });
        return;
      }
    })

  },

  changeCover: function() {

  }
})