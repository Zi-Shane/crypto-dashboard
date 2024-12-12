const ws = new WebSocket('wss://stream.binance.com/stream');
export const DefaultTick = '!miniTicker@arr@3000ms';

const subscribeMsg = {
  id: 1,
  method: 'SUBSCRIBE',
  params: ['!miniTicker@arr@3000ms'],
};

export function connectTickSocket() {
  ws.onopen = () => {
    ws.send(JSON.stringify(subscribeMsg));
    console.log('open connection');
  };
}

export function closeTickSocket() {
  ws.onclose = () => {
    console.log('close connection');
  };
}

export function handleSocketMessage(
  type: StreamType,
  updater: (socketMsg: TickerData[]) => void,
) {
  ws.onmessage = event => {
    let message: SocketRespData = JSON.parse(event.data);
    // Check if message is relevant
    if (message.stream === type) {
      updater(message.data);
    }
  };
}

export type StreamType =
  | '!miniTicker@arr@3000ms'
  | '!ticker_1h@arr@3000ms'
  | '!ticker_4h@arr@3000ms';

// Type definition for ticker data
export type TickerData = {
  e: string;
  E: number;
  s: string;
  p: string;
  P: string;
  w: string;
  x: string;
  c: string;
  Q: string;
  b: string;
  B: string;
  a: string;
  A: string;
  o: string;
  h: string;
  l: string;
  v: string;
  q: string;
  O: number;
  C: number;
  F: number;
  L: number;
  n: number;
};

// Type definition for the full response
export type SocketRespData = {
  stream: StreamType;
  data: TickerData[];
};
