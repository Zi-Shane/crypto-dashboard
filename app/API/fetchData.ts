/*
{
//           "s": "BNBBTC",
//           "st": "TRADING",
//           "b": "BNB",
//           "q": "BTC",
//           "ba": "",
//           "qa": "฿",
//           "i": "0.00100000",
//           "ts": "0.000001",
//           "an": "BNB",
//           "qn": "Bitcoin",
//           "o": "0.006155",
//           "h": "0.006198",
//           "l": "0.006110",
//           "c": "0.006146",
//           "v": "44189.874000",
//           "qv": "271.80738463",
//           "y": 0,
//           "as": 44189.87400000,
//           "pm": "BTC",
//           "pn": "BTC",
//           "cs": 151693907,
//           "tags": [
//               "Layer1_Layer2",
//               "BSC",
//               "pos",
//               "bnbchain"
//           ],
//           "pom": false,
//           "pomt": null,
//           "lc": false,
//           "g": true,
//           "sd": false,
//           "r": false,
//           "hd": false,
//           "rb": false,
//           "ks": false,
//           "etf": false
//       },
*/

type retSymbol24hr = {
  data: symbol24hr[];
};

export type symbol24hr = {
  s: string;
  b: string;
  q: string;
  o: number;
  c: number;
  h: number;
  l: number;
  qv: number;
  p: number;
};

export type symbolData = {
  symbol: string;
  status: string;
  baseAsset: string;
};
export type ExchangeInfo = { symbols: symbolData[] };

export function getExchangeInfo(): Promise<ExchangeInfo> {
  return fetch('https://api-gcp.binance.com/api/v3/exchangeInfo')
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

export function getExchangeInfoS(): Promise<ExchangeInfo> {
  return fetch('https://www.binance.com/dapi/v1/exchangeInfo?showall=true')
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

export function getTick24hr(): Promise<retSymbol24hr> {
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

// {
//   "code": "000000",
//   "message": null,
//   "messageDetail": null,
//   "data": [
//       {
//           "s": "BNBBTC",
//           "st": "TRADING",
//           "b": "BNB",
//           "q": "BTC",
//           "ba": "",
//           "qa": "฿",
//           "i": "0.00100000",
//           "ts": "0.000001",
//           "an": "BNB",
//           "qn": "Bitcoin",
//           "o": "0.006155",
//           "h": "0.006198",
//           "l": "0.006110",
//           "c": "0.006146",
//           "v": "44189.874000",
//           "qv": "271.80738463",
//           "y": 0,
//           "as": 44189.87400000,
//           "pm": "BTC",
//           "pn": "BTC",
//           "cs": 151693907,
//           "tags": [
//               "Layer1_Layer2",
//               "BSC",
//               "pos",
//               "bnbchain"
//           ],
//           "pom": false,
//           "pomt": null,
//           "lc": false,
//           "g": true,
//           "sd": false,
//           "r": false,
//           "hd": false,
//           "rb": false,
//           "ks": false,
//           "etf": false
//       },
