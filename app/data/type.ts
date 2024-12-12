export type ProductInfo = {
  symbol: string;
  base: string;
  quote: string;
  quoteName: string;
  current: string;
  open: string;
  high: string;
  low: string;
  high_low: string;
  percentage: number;
  volumn: string;
  tags: string[];
};

//       "s": "BNBBTC",
//       "b": "BNB",
//       "q": "BTC",
//       "qn": "Bitcoin",
//       "c": "0.006146",
//       "o": "0.006155",
//       "qv": "271.80738463",
//       "tags": [
//         "Layer1_Layer2",
//         "BSC",
//         "pos",
//         "bnbchain"
//       ],
