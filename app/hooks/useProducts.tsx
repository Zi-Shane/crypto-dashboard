import {
  closeTickSocket,
  connectTickSocket,
  fromTickSocket,
  getRespProduct24hrTick,
} from 'API';
import { changedPercentage, sortProductsMap } from '@/utilies';
import { useEffect, useState } from 'react';

type RetFetchProducts = {
  quoteMap: Map<string, string[]>;
  selectedProduct: Map<string, Product24hrTick>;
  totalRows: number;
};

export function useProducts(
  quote: string,
  sortAttr: SortAttr,
  currentPage: number,
): RetFetchProducts {
  const [products, setProducts] = useState(
    new Map<string, Product24hrTick>([]),
  );
  const [quoteMap] = useState<Map<string, string[]>>(new Map([]));

  function getProduct24hrTick() {
    let res: Map<string, Product24hrTick> = new Map();
    getRespProduct24hrTick().then(data => {
      const listData = data.data;
      listData.sort((a, b) => b.qv - a.qv);
      for (const value of listData) {
        if (value.qv < 1e3) continue;
        const cur = quoteMap.get(value.q);
        if (cur) {
          quoteMap.set(value.q, [...cur, value.b]);
        } else {
          quoteMap.set(value.q, [value.b]);
        }
        value.p = changedPercentage(value.o, value.c);
        res.set(value.s, value);
      }
      setProducts(res);
    });
  }

  useEffect(() => {
    getProduct24hrTick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateTable(updates: ProductUpdate[]) {
    updates.map(update => {
      const currentData = products.get(update.s);
      if (currentData) {
        currentData.c = update.c;
        currentData.p = changedPercentage(update.o, update.c);
        currentData.h = update.h;
        currentData.l = update.l;
        currentData.qv = update.q;
        products.set(update.s, currentData);
      }
    });
    setProducts(new Map(products));
  }
  fromTickSocket(updateTable);

  useEffect(() => {
    connectTickSocket();
    return () => {
      closeTickSocket();
    };
  }, []);

  function filterProducts(
    quoteMap: Map<string, string[]>,
    products: Map<string, Product24hrTick>,
  ): Map<string, Product24hrTick> {
    if (quote == 'ALL') {
      return sortProductsMap(sortAttr.column, sortAttr.desc, products);
    }

    const baseList = quoteMap.get(quote);
    let ret = new Map<string, Product24hrTick>([]);

    if (baseList) {
      for (const base of baseList) {
        const productName = base + quote;
        const productInfo = products.get(productName);
        if (productInfo) ret.set(productName + quote, productInfo);
      }
    }

    return sortProductsMap(sortAttr.column, sortAttr.desc, ret);
  }

  function pageProducts(
    filterdProducts: Map<string, Product24hrTick>,
    currentPage: number,
  ) {
    const end = currentPage * 10;
    const start = end - 10;
    const tmp = Array.from(filterdProducts).slice(start, end);
    return new Map(tmp);
  }

  console.log('total: ', products.size);
  let filterdProducts = filterProducts(quoteMap, products);
  let totalRows = filterdProducts.size;
  console.log('rows: ', totalRows);

  let selectedProduct = pageProducts(filterdProducts, currentPage);

  return { quoteMap, selectedProduct, totalRows };
}