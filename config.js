const host = 'http://10.1.2.87:9002';


//const host = 'https://dotlive.dot.cc'

const config = {
  service: {
    host,
    loginUrl: host + '/login',
  }
}

module.exports = config