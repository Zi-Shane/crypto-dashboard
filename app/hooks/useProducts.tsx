import {
  closeTickSocket,
  connectTickSocket,
  fromTickSocket,
  getRespProduct24hrTick,
} from 'API';
import { changedPercentage, sortProductsMap } from 'Utilies';
import { useEffect, useState } from 'react';

type RetFetchProducts = {
  quoteGroup: Map<string, string[]>;
  selectedProduct: Map<string, Product24hrTick>;
};

export function useProducts(
  quote: string,
  sortAttr: SortAttr,
): RetFetchProducts {
  const [products, setProducts] = useState(
    new Map<string, Product24hrTick>([]),
  );
  const [quoteGroup] = useState<Map<string, string[]>>(new Map([]));

  function getProduct24hrTick() {
    let res: Map<string, Product24hrTick> = new Map();
    getRespProduct24hrTick().then(data => {
      const listData = data.data;
      listData.sort((a, b) => b.qv - a.qv);
      for (const value of listData) {
        if (value.qv < 1e3) continue;
        const cur = quoteGroup.get(value.q);
        if (cur) {
          quoteGroup.set(value.q, [...cur, value.b]);
        } else {
          quoteGroup.set(value.q, [value.b]);
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

  function filterProducts(): Map<string, Product24hrTick> {
    if (quote == 'ALL') {
      return sortProductsMap(sortAttr.type, sortAttr.desc, products);
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

    return sortProductsMap(sortAttr.type, sortAttr.desc, ret);
  }

  const selectedProduct = filterProducts();

  return { quoteGroup, selectedProduct };
}
