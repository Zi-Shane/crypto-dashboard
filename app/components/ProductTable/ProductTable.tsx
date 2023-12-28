import { useAllProducts } from 'hooks';
import { TableData } from 'components';
import styles from './styles.module.css';
import {
  CurrencyQuotes,
  CoinQuote,
  QuoteGroup,
  column,
} from '@/constants';
import { useCallback, useMemo, useState } from 'react';
import { sortProductsMap } from '@/Utilies';
import { FilterLabels } from '../FilterLabels';

export function ProductTable() {
  const { products, quoteGroup, sortAllProducts } = useAllProducts();
  const [quoteType, setQuoteType] = useState('Currency');
  const [quote, setQuote] = useState('ALL');

  const getProducts = (quote: string): Map<string, Product24hrTick> => {
    if (quote == 'ALL') {
      return sortProductsMap(column.volumn, true, products);
    }

    const baseList = quoteGroup.get(quote);
    let ret = new Map<string, Product24hrTick>([]);

    if (baseList) {
      for (const base of baseList) {
        const productName = base + quote;
        const productInfo = products.get(productName);
        if (productInfo) ret.set(productName + quote, productInfo);
      }
    }

    return sortProductsMap(column.volumn, true, ret);
  };

  return (
    <div>
      <FilterLabels quote={quote} setQuote={setQuote} />
      <TableData products={getProducts(quote)} />
    </div>
  );
}
