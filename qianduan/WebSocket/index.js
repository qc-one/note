//  详细版，参考 https://www.zhangshengrong.com/p/q0arAAqk1x/
const wsUrl = 'ws://127.0.0.1:51103';
let socket = null;
let globalCallback = null, sendData = null; //把要发送给socket的数据和处理socket返回数据的回调保存起来
let timer = null;
let createSocket = url => { //创建socket
  try {
    if ('WebSocket' in window) {
      socket = new WebSocket(url)
    } else if ('MozWebSocket' in window) {
      socket = new MozWebSocket(url)
    }
    //Vue.prototype.socket = socket //需要主动关闭的话就可以直接调用this.socket.close()进行关闭，不需要的话这个可以去掉
    initSocket()
  } catch (e) {
    globalCallback && globalCallback('ws:error')
  }
}
const sendMsg = (data, callback) => { //发送数据,接收数据
  if (socket.readyState === 1) {
    globalCallback = callback;
    sendData = data;
    data = JSON.stringify(data);
    socket.send(data);
  } else {
    timer = setTimeout(() => {
      sendMsg(data, callback)
    }, 500)
    return false
  }
  socket.onmessage = ev => {
    clearTimeout(timer)
    callback && callback(ev)
  }
}

const initSocket = () => { //初始化websocket
  socket.onopen = () => {
  }
  socket.onerror = () => {
    clearTimeout(timer)
    globalCallback && globalCallback('ws:error')
    console.log('websocket服务出错了:onerror');
  }
  socket.onclose = () => {
    clearTimeout(timer)
    globalCallback && globalCallback('ws:error')
    console.log('websocket服务关闭了:onclose');
  }
}

/**
 * 获取驱动的消息
 * @param callback
 */
const PARAMS = {
  jsonrpc: '2.0',
  method: 'CardServer.GetHidInfo',
  params: [],
  id: 1
}
const getHidInfo = (callback) => {
  globalCallback = callback
  sendMsg(PARAMS, ev => {callback(ev)})
}
createSocket(wsUrl)
export default {getHidInfo}
