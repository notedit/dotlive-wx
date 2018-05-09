// pages/room/room.js

const SocketClient = require("../../lib/live.js")
const config = require('../../config.js')

let app = getApp()

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
    let userInfo = app.globalData.userInfo
    this.data.roomId = options.roomId
    this.data.roomName = options.roomName

    let self = this
    app.socketClient = new SocketClient(userInfo.id,options.roomId,config.service.host, {
      onConnect: function(){
        console.log('onConnect')
      },
      onClose : function() {
        console.log('onClose')
      },
      onDisconnect: function(reason){
        console.log('onDisconnect')
      },
      onReconnect: function(attempNumber){
        console.log('onReconnect')
      },
      onError: function(err) {
        
      },
      onChat: function(data) {
        
      },
      onRequestOnStage: function(data){

      },
      onAcceptRequestOnStage: function(data) {

      },
      onRemoveOnStage: function(data) {

      },
      onLeaveOnStage: function(data) {

      },
      onStage: function(data){

      },
      onStageToggle: function(data){
        
      },
      onPrevPage: function(data){

      },
      onNextPage: function(data) {

      },
      onJoined: function(data) {

      }
    })
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

  },
})