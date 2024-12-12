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
