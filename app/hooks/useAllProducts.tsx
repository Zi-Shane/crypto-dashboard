import {
  closeTickSocket,
  connectTickSocket,
  fromTickSocket,
  getRespProduct24hrTick,
  subscribeTickSocket,
} from 'API';
import { changedPercentage, sortProductsMap } from 'Utilies';
import { column } from '@/constants';
import { useCallback, useEffect, useState } from 'react';

type RetFetchAllProducts = {
  products: Map<string, Product24hrTick>;
  quoteGroup: Map<string, string[]>;
  sortAllProducts: (curType: string, newDesc: boolean) => void;
};

export function useAllProducts(): RetFetchAllProducts {
  const [products, setProducts] = useState(
    new Map<string, Product24hrTick>([]),
  );
  const [quoteGroup] = useState<Map<string, string[]>>(new Map([]));

  function getProduct24hrTick() {
    let res: Map<string, Product24hrTick> = new Map();
    getRespProduct24hrTick().then(data => {
      const listData = data.data;
      // listData.sort((a, b) => b.qv - a.qv);
      for (const value of listData) {
        const cur = quoteGroup.get(value.q);
        if (cur) {
          quoteGroup.set(value.q, [...cur, value.b]);
        } else {
          quoteGroup.set(value.q, [value.b]);
        }
        // if (value.q == 'USDT') {
        value.p = changedPercentage(value.o, value.c);
        res.set(value.s, value);
        // }
      }
      setProducts(res);
    });
  }

  useEffect(() => {
    getProduct24hrTick();
  }, []);

  const updateTable = useCallback(
    (updates: ProductUpdate[]) => {
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
    },
    [products],
  );

  useEffect(() => {
    connectTickSocket();
    subscribeTickSocket();
    fromTickSocket(updateTable);
    return () => {
      closeTickSocket();
    };
  }, [updateTable]);

  function sortAllProducts(orderBy: string, newDesc: boolean) {
    setProducts(sortProductsMap(orderBy, newDesc, products));
  }

  return { products, quoteGroup, sortAllProducts };
}
