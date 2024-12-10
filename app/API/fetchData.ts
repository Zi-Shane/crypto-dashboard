export function getRespProduct24hrTick(): Promise<RespProduct24hrTick> {
  return fetch(
    'https://www.binance.com/bapi/asset/v2/public/asset-service/product/get-products?includeEtf=true',
  )
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      return res.json();
    })
    .catch(err => {
      console.error(err);
    });
}

export type RespProduct24hrTick = {
  code: string;
  message: null | string;
  messageDetail: null | string;
  data: Product24hrTick[];
  success: boolean;
};

export type Product24hrTick = {
  s: string; // Symbol
  st: string; // Status
  b: string; // Base asset
  q: string; // Quote asset
  ba: string; // Base asset symbol
  qa: string; // Quote asset symbol
  i: string; // Interval
  ts: string; // Tick size
  an: string; // Asset name
  qn: string; // Quote asset name
  o: string; // Open price
  h: string; // High price
  l: string; // Low price
  c: string; // Close price
  v: string; // Volume
  qv: string; // Quote volume
  y: number; // Yesterday's close price
  as: number; // Asset supply
  pm: string; // Price metric
  pn: string; // Price name
  cs: number; // Circulating supply
  tags: string[]; // Tags
  pom: boolean; // POM flag
  pomt: null | string; // POM type
  lc: boolean; // LC flag
  g: boolean; // Global flag
  sd: boolean; // SD flag
  r: boolean; // R flag
  hd: boolean; // HD flag
  rb: boolean; // RB flag
  ks: boolean; // KS flag
  se: string; // SE value
  pmet: null | string; // Price metric type
  etf: boolean; // ETF flag
};

// Response Exmaple:
// const resp = {
//   code: '000000',
//   message: null,
//   messageDetail: null,
//   data: [
//     {
//       s: 'BNBBTC',
//       st: 'TRADING',
//       b: 'BNB',
//       q: 'BTC',
//       ba: '',
//       qa: '฿',
//       i: '0.00100000',
//       ts: '0.000001',
//       an: 'BNB',
//       qn: 'Bitcoin',
//       o: '0.007851',
//       h: '0.008207',
//       l: '0.006888',
//       c: '0.007059',
//       v: '139957.247000',
//       qv: '1065.1636101',
//       y: 0,
//       as: 139957.247,
//       pm: 'BTC',
//       pn: 'BTC',
//       cs: 144009436,
//       tags: ['Layer1_Layer2', 'BSC', 'pos', 'bnbchain'],
//       pom: false,
//       pomt: null,
//       lc: false,
//       g: true,
//       sd: false,
//       r: false,
//       hd: false,
//       rb: false,
//       ks: false,
//       se: '1',
//       pmet: null,
//       etf: false,
//     },
//     {
//       s: 'NULSBTC',
//       st: 'TRADING',
//       b: 'NULS',
//       q: 'BTC',
//       ba: '',
//       qa: '฿',
//       i: '1.00000000',
//       ts: '0.00000001',
//       an: 'Nuls',
//       qn: 'Bitcoin',
//       o: '0.00000581',
//       h: '0.00000615',
//       l: '0.00000548',
//       c: '0.00000557',
//       v: '191964.00000000',
//       qv: '1.11107472',
//       y: 0,
//       as: 191964.0,
//       pm: 'BTC',
//       pn: 'BTC',
//       cs: 110729243,
//       tags: ['Layer1_Layer2', 'mining-zone', 'pos'],
//       pom: false,
//       pomt: null,
//       lc: false,
//       g: true,
//       sd: false,
//       r: false,
//       hd: false,
//       rb: false,
//       ks: false,
//       se: '1',
//       pmet: null,
//       etf: false,
//     },
//     {
//       s: 'NEOBTC',
//       st: 'TRADING',
//       b: 'NEO',
//       q: 'BTC',
//       ba: '',
//       qa: '฿',
//       i: '0.01000000',
//       ts: '0.0000001',
//       an: 'NEO',
//       qn: 'Bitcoin',
//       o: '0.0002467',
//       h: '0.0002487',
//       l: '0.0001998',
//       c: '0.0002031',
//       v: '181133.5800000',
//       qv: '40.56341645',
//       y: 0,
//       as: 181133.58,
//       pm: 'BTC',
//       pn: 'BTC',
//       cs: 70538831,
//       tags: ['Layer1_Layer2', 'mining-zone', 'pos'],
//       pom: false,
//       pomt: null,
//       lc: false,
//       g: true,
//       sd: false,
//       r: false,
//       hd: false,
//       rb: false,
//       ks: false,
//       se: '1',
//       pmet: null,
//       etf: false,
//     },
//     {
//       s: 'LINKBTC',
//       st: 'TRADING',
//       b: 'LINK',
//       q: 'BTC',
//       ba: '',
//       qa: '฿',
//       i: '0.01000000',
//       ts: '0.0000001',
//       an: 'ChainLink',
//       qn: 'Bitcoin',
//       o: '0.0002519',
//       h: '0.0002766',
//       l: '0.0002273',
//       c: '0.0002325',
//       v: '888472.0500000',
//       qv: '224.25881467',
//       y: 0,
//       as: 888472.05,
//       pm: 'BTC',
//       pn: 'BTC',
//       cs: 626849970,
//       tags: ['Infrastructure'],
//       pom: false,
//       pomt: null,
//       lc: false,
//       g: true,
//       sd: false,
//       r: false,
//       hd: false,
//       rb: false,
//       ks: false,
//       se: '1',
//       pmet: null,
//       etf: false,
//     },
//   ],
//   success: true,
// };
