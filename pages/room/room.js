// pages/room/room.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomId: '',
    roomName: '',
    comments: [],
    inputContent: '',
    slideImages: [],
    currentImage: '',
    muted: false 
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
    var self = this
    console.log('room one in ')
    
    wx.setKeepScreenOn({
      keepScreenOn: true
    })
    self.data.isShow = true;
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

    // 关闭 socketio

    
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

  onNotify: function(e) {

  },

  toggleMute: function() {

  },

  bindInputContent: function(e) {

  }
})