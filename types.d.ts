type Product24hrTick = {
  s: string; // symbol 'BTCUSDT'
  b: string; // base 'BTC'
  q: string; // qutoe 'USDT'
  o: number; // open
  c: number; // last price
  h: number; // high
  l: number; // low
  qv: number; // volumn
  p: number; // change percent
};

type RespProduct24hrTick = {
  data: Product24hrTick[];
};

type ProductUpdate = {
  c: number; // last price
  e: string; // socket subscribed tag
  h: number; // high
  l: number; // low
  o: number; // open
  q: number; // volumn
  s: string; // symbol
};

type SocketRespData = {
  stream: string;
  data: ProductUpdate[];
};

type SortAttr = { column: columnName; desc: boolean };

type QuoteType = {
  group: string;
  name: string;
};
