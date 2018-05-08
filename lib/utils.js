

function  randomstr(){
  
  return Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6);

}


module.exports = {
  randomstr
}