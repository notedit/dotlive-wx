const host = 'http://192.168.50.196:9002';


//const host = 'https://dotlive.dot.cc'

const config = {
  service: {
    host,
    loginUrl: host + '/login',
  }
}

module.exports = config