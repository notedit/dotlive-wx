// pages/cameraview/cameraview.js

const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    user: {type:String, value:''},
    // 推流Url
    pushUrl: {type:String, value:''},
    // 推流code
    event: { type: Number, value: 0, observer: function (newVal, oldVal) { this.onPush(newVal); } },
    // 推流配置
    config: { type: Object, value: {}, observer: function (newVal, oldVal) { this.setConfig(newVal, oldVal); } },
    // 样式
    styles: { type: Object, value: {} }
  },

  /**
   * 组件的初始数据
   */
  data: {
    pusherContext:'',
    pushUrl: '',
    user:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setConfig: function (newVal, oldVal) {
      // 切换摄像头
      if (this.data.pusherContext && newVal.camera != oldVal.camera) {
        this.data.pusherContext.switchCamera({});
      }
      // 视频操作
      if (this.data.pusherContext && newVal.operate != oldVal.operate) {
        switch (newVal.operate) {
          case 'start': {
            this.data.pusherContext.start(); break;
          }
          case 'stop': {
            this.data.pusherContext.stop(); break;
          }
          case 'pause': {
            this.data.pusherContext.pause(); break;
          }
          case 'resume': {
            this.data.pusherContext.resume(); break;
          }
        }
      }
      this.setData({
        config: newVal
      });
    },
    // 推流
    onPush: function(e) {
      var self = this
      var code
      if(e.detail){
        code = e.detail.code
      } else {
        code = e
      }
      console.log('onPush: ', code)
      switch (code) {
        case 1002: {
          // 推流成功
          app.roomClient.addPusher({
            user:self.data.user,
            pushUrl:self.data.pushUrl
          })
          console.log('addPusher')
          break
        }
        case -1301: {
          console.log('打开摄像头失败: ', code);
          // 触发外部事件
          self.triggerEvent('notify', {
            type: 'onFail',
            errCode: -9,
            errMsg: '打开摄像头失败，请再次尝试'
          }, {})
          break
        }
        case -1302: {
          console.log('打开麦克风失败: ', code);
          // 触发外部事件
          self.triggerEvent('notify', {
            type: 'onFail',
            errCode: -9,
            errMsg: '打开麦克风失败，请再次尝试'
          }, {})
          break
        }
        case -1307: {
          console.log('推流连接断开: ', code);
          // 触发外部事件
          self.triggerEvent('notify', {
            type: 'onFail',
            errCode: -9,
            errMsg: '推流已断开，请检查网络状态后重试'
          }, {})
          break
        }
        default: {
        }
      }
    },

    onError: function (e) {
      var self = this
      console.log('错误处理', e)
      e.detail.errCode == 10001 ? (e.detail.errMsg = '未获取到摄像头功能权限，请删除小程序后重新打开') : ''
      e.detail.errCode == 10002 ? (e.detail.errMsg = '未获取到录音功能权限，请删除小程序后重新打开') : ''
      // 触发外部事件
      self.triggerEvent('notify', {
        type: 'onFail',
        errCode: e.detail.errCode,
        errMsg: e.detail.errMsg || '未获取到摄像头、录音功能权限，请删除小程序后重新打开'
      }, {})
    
    
    },

    onStates: function(e) {
      //console.log('onStates:', e.detail)
    }
  },

  ready: function(){
    if (!this.data.pusherContext) {
      this.data.pusherContext = wx.createLivePusherContext('local')
    }
  }
})
