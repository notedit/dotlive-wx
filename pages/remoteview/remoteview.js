// pages/remoteview/remoteview.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    user : { type: String, value: ''},
    playUrl : {type:String, value: ''},
    // 拉流配置
    config: { type: Object, value: {}, observer: function (newVal, oldVal) { this.setConfig(newVal, oldVal); } },
    // 样式
    styles: { type: Object, value: {} }
  },

  /**
   * 组件的初始数据
   */
  data: {
    user:'',
    playUrl:'',
    playerContext: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function(e){
      let self = this
      let code = e.detail.code

      console.log('onPlay', self.user,code)

      switch (code) {
        case 2007: {
          console.log('视频播放loading', e)
          break
        }
        case 2004: {
          console.log('视频播放开始:', e)
          break
        }
        default: {
          console.log('视频拉流情况:', e)
        }
      }
    },
    setConfig: function(newVal, oldVal) {

    }
  },

  ready: function(e){

    if(!this.data.playerContext){
      let playerContext = wx.createLivePlayerContext(this.data.user, this)

      this.setData({
        playerContext:playerContext
      })
    }
  }
})
