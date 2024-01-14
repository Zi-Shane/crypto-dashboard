import { COIN_QUOTES, QUOTE_GROUPS } from '@/constants';
import { useState } from 'react';

type useFilterProps = {
  products: Map<string, Product24hrTick>;
  quoteMap: Map<string, string[]>;
};

type useFilterRet = {
  filterdProducts: Map<string, Product24hrTick>;
  quote: QuoteType;
  updateQuote: (quote: QuoteType) => void;
  keyword: string;
  updateKeyword: (keyword: string) => void;
};

export function useFilter({
  products,
  quoteMap,
}: useFilterProps): useFilterRet {
  const [quote, setQuote] = useState<QuoteType>({
    group: QUOTE_GROUPS.COIN,
    name: Object.values(COIN_QUOTES)[0],
  });
  const [keyword, setKeyword] = useState('');

  function updateQuote(quote: QuoteType) {
    setQuote(quote);
  }

  function updateKeyword(keyword: string) {
    setKeyword(keyword);
  }

  function filterProducts(
    products: Map<string, Product24hrTick>,
    quoteMap: Map<string, string[]>,
    quote: string,
  ): Map<string, Product24hrTick> {
    if (quote == 'ALL') {
      return products;
    }
    const baseList = quoteMap.get(quote);
    let ret = new Map<string, Product24hrTick>([]);

    if (baseList) {
      for (const base of baseList) {
        const productName = base + quote;
        const productInfo = products.get(productName);
        if (productInfo) ret.set(productName, productInfo);
      }
    }

    return ret;
  }

  function filterByKeyword(
    selectedProducts: Map<string, Product24hrTick>,
    keyword: string,
  ) {
    let filterProducts: Map<string, Product24hrTick> = new Map([]);
    for (let [symbol, value] of selectedProducts) {
      if (symbol.toLowerCase().includes(keyword.toLowerCase())) {
        const value = selectedProducts.get(symbol);
        if (value) filterProducts.set(symbol, value);
      }
    }
    return filterProducts;
  }

  let selectedProducts = filterProducts(products, quoteMap, quote.name);
  const filterdProducts =
    keyword == ''
      ? selectedProducts
      : filterByKeyword(selectedProducts, keyword);
  return { filterdProducts, quote, updateQuote, keyword, updateKeyword };
}
