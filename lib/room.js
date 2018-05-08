const socketio = require('./weapp.socket.io.js');


class Client {
  constructor(user,url,callback){
    this.pusher = null
    this.players = {}
    this.closed = false
    this.user = user
    this.url = url
    this.room = null
    this.callback = callback

    this._setupSocket()
  }
  joinRoom(room) {
    if(this.closed){
      return
    }
    this.room = room
    this.socket.emit('join', {
      user: this.user,
      room: this.room
    }, (data) => {
      this.callback.onJoined && this.callback.onJoined()
    })
  }
  leaveRoom(){
    if(this.closed){
      return
    }
    this.socket.emit('leave',{})
  }
  addPusher(pusher){
    if (this.closed) {
      return
    }
    this.pusher = pusher
    this.socket.emit('addPusher', {
      user: this.user,
      pushUrl: pusher.pushUrl
    })
  }
  
  removePusher(pusher) {
    if (this.closed) {
      return
    }
    this.pusher = null
    this.socket.emit('removePusher', {
      user: this.user,
      pushUrl: pusher.pushUrl
    })
  }
  close() {
    if(this.closed){
      return
    }
    this.closed = true
    this.socket && this.socket.disconnect(true)
    
    this.callback.onClose && this.callback.onClose() 
  }
  _setupSocket() {

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

    socket.on('pusher_added', (data) => {
      this._handlePusherAdded(data)
    })

    socket.on('pushers', (data) => {
      this._handlePushers(data)
    })

    socket.on('pusher_leaved', (data) => {
      this._handlePusherLeaved(data)
    })
  }

  _handlePusherAdded(data) {
    console.log('handlePusherAdded', data)

    this.callback.onPusherAdded && this.callback.onPusherAdded(data)
  }
  _handlePushers(data) {
    console.log('handlePushers', data)

    this.callback.onPushers && this.callback.onPushers(data)
  }
  _handlePusherLeaved(data) {
    console.log('handlePusherLeaved', data)

    this.callback.onPusherLeaved && this.callback.onPusherLeaved(data)
  }
}


module.exports = {
  Client
}