let ws = new WebSocket('wss://stream.binance.com/stream');
const apiCall = {
  id: 1,
  method: 'SUBSCRIBE',
  params: ['!miniTicker@arr@3000ms'],
};

export function connectTickSocket() {
  ws.onopen = () => {
    ws.send(JSON.stringify(apiCall));
    console.log('open connection');
  };
}

export function closeTickSocket() {
  ws.onclose = () => {
    console.log('close connection');
  };
}

export function fromTickSocket(fn: Function) {
  ws.onmessage = event => {
    let socketData: SocketRespData = JSON.parse(event.data);
    if (socketData.stream === '!miniTicker@arr@3000ms') {
      fn(socketData.data);
    }
  };
}

// Socket Example:
/*
stream: "!miniTicker@arr@3000ms" | "!ticker_1h@arr@3000ms" | "!ticker_4h@arr@3000ms"
data: [{
  E: 1703223930497   //id?
  c: "0.00624400"    //current
  e: "24hrMiniTicker"
  h: "0.00630200"    //height
  l: "0.00590200"    //low
  o: "0.00590300"    //open
  q: "435.66528229"  //volumn
  s: "BNBBTC"
  v: "70728.86100000"  //?
},...]
*/
