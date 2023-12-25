let ws = new WebSocket('wss://stream.binance.com/stream');
let open = false;

/*
stream: "!miniTicker@arr@3000ms" | "!ticker_1h@arr@3000ms" | "!ticker_4h@arr@3000ms"
data: [{
  E: 1703223930497   //id?
  c: "0.00624400"    //latest
  e: "24hrMiniTicker"
  h: "0.00630200"    //height
  l: "0.00590200"    //low
  o: "0.00590300"    //open
  q: "435.66528229"  //volumn
  s: "BNBBTC"
  v: "70728.86100000"  //?
},...]
*/

export type productInfo = {
  c: number;
  e: string;
  h: number;
  l: number;
  o: number;
  q: number;
  s: string;
};

type socketData = {
  stream: string;
  data: productInfo[];
};

export function connectTickSocket() {
  ws.onopen = () => {
    open = true;
    console.log('open connection');
  };
}

export function closeTickSocket() {
  ws.onclose = () => {
    console.log('close connection');
  };
}

export function subscribeTickSocket() {
  if (ws.readyState === ws.OPEN) {
    ws.send(
      `{
        "id": 1,
        "method": "SUBSCRIBE",
        "params": ["!miniTicker@arr@3000ms"]
    }`,
    );
  } else if (ws.readyState === ws.CONNECTING) {
    ws.addEventListener('open', () => subscribeTickSocket());
  } else {
    console.error('readyState error');
  }
}

export function fromTickSocket(fn: Function) {
  ws.onmessage = event => {
    let socketData: socketData = JSON.parse(event.data);
    if (socketData.stream === '!miniTicker@arr@3000ms') {
      fn(socketData.data);
    }
  };
}
