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
  'ARS',
  'BIDR',
  'BRL',
  'EUR',
  'IDRT',
  'NGN',
  'PLN',
  'RON',
  'RUB',
  'TRY',
  'UAH',
  'ZAR',
];

export const CoinQuotes = [
  // 'ALL',
  'USDT',
  'FDUSD',
  'USDC',
  'TUSD',
  'BNB',
  'BTC',
  'ETH',
  'DAI',
  'XRP',
  'TRX',
  'DOGE',
  'VAI',
  'AEUR',
];

export const PAGE_LIMIT = 10;
