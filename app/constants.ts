export enum ColumnName {
  symbol,
  lastPrice,
  percentage,
  volumn,
}

export enum QuoteGroup {
  currency = 'currency',
  coin = 'coin',
}

export const CurrencyQuotes = [
  // 'ALL',
  'TRY',
  'NGN',
  'BRL',
  'RUB',
  'UAH',
  'EUR',
  'ZAR',
  'GBP',
  'RON',
];

export const CoinQuotes = [
  // 'ALL',
  'USDT',
  'FDUSD',
  'BTC',
  'ETH',
  'TUSD',
  'BIDR',
  'IDRT',
  'BNB',
  'ARS',
  'USDC',
  'DOGE',
  'DAI',
  'AEUR',
  'TRX',
  'XRP',
  'VAI',
];
