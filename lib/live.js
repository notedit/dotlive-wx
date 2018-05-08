const socketio = require('./weapp.socket.io.js');






class Client {
  constructor(user, url, callback) {
    this.pusher = null
    this.players = {}
    this.closed = false
    this.user = user
    this.url = url
    this.room = null
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

    })

    socket.on('requestOnStage', (data) => {
      
      
    })

    socket.on('acceptRequestOnStage', (data) => {

    })

    socket.on('removeOnStage', (data) => {


    })

    socket.on('leaveOnStage', (data) => {


    })

    socket.on('OnStage', (data) => {

    })

    socket.on('stageToggle', (data) => {

    })

    socket.on('prevPage', (data) => {

    })

    socket.on('nextPage', (data) => {

    })

    socket.on('joined', (data) => {

    })

    
  }

}


module.exports = {
  Client
}