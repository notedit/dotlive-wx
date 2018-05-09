const socketio = require('./weapp.socket.io.js');



class SocketClient {
  constructor(user, room,url, callback) {
    this.closed = false
    this.user = user
    this.url = url
    this.room = room
    this.callback = callback

    this._setupSocket()
  }
  emit(message,data)  {
    if(this.socket){
      this.socket.emit(message,data)
    }
  }
  close() {
    if (this.closed) {
      return
    }
    this.closed = true
    this.socket && this.socket.disconnect(true)

    this.callback.onClose && this.callback.onClose()
  }
  _setupSocket() {

    if(this.socket){
      this.socket.close();
      this.socket = null
    }

    const socket = socketio(this.url, {
      reconnectionAttempts: 10,
      transports: ['websocket']
    })

    this.socket = socket

    socket.on('connect', () => {
      console.log('connect')
      this.callback.onConnect && this.callback.onConnect()
    })

    socket.on('disconnect', (reason) => {
      this.callback.onDisconnect && this.callback.onDisconnect(reason)
    })

    socket.on('reconnect', (attemptNumber) => {
      if (attemptNumber > 10) {
        this.close()
        return
      }

      this.callback.onReconnect && this.callback.onReconnect(attemptNumber)
    })

    socket.on('error', (err) => {
      console.error('socket error', err)
      this.callback.onError && this.callback.onError(err)
      this.close() //  do we need close here 
    })

    socket.on('chat', (data) => {
      this.callback.onChat && this.callback.onChat(data)
    })

    socket.on('requestOnStage', (data) => {
      this.callback.onRequestOnStage && this.callback.onRequestOnStage(data)
    })

    socket.on('acceptRequestOnStage', (data) => {
      this.callback.onAcceptRequestOnStage && this.callback.onAcceptRequestOnStage(data)
    })

    socket.on('removeOnStage', (data) => {
      this.callback.onRemoveOnStage && this.callback.onRemoveOnStage(data)
    })

    socket.on('leaveOnStage', (data) => {
      this.callback.onLeaveOnStage && this.callback.onLeaveOnStage(data)
    })
    
    socket.on('OnStage', (data) => {
        this.callback.nStage && this.callback.onStage(data)
    })

    socket.on('stageToggle', (data) => {
        this.callback.onStageToggle && this.callback.onStageToggle(data)
    })

    socket.on('prevPage', (data) => {
        this.callback.onPrevPage && this.callback.onPrevPage(data)
    })

    socket.on('nextPage', (data) => {
        this.callback.onNextPage && this.callback.onNextPage(data)
    })

    socket.on('joined', (data) => {
        this.callback.onJoined && this.callback.onJoined(data)
    })


  }

}


module.exports = SocketClient