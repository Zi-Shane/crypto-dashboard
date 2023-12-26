import {
  closeTickSocket,
  connectTickSocket,
  fromTickSocket,
  getRespProduct24hrTick,
  subscribeTickSocket,
} from 'API';
import { changedPercentage } from 'Utilies';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

type RetFetchAllProducts = {
  products: Map<string, Product24hrTick>;
  setProducts: Dispatch<SetStateAction<Map<string, Product24hrTick>>>;
  sortProductsMap: (curType: string, newDesc: boolean) => void;
};

export function useAllProducts(): RetFetchAllProducts {
  const [products, setProducts] = useState(
    new Map<string, Product24hrTick>([]),
  );

  function getProduct24hrTick() {
    let res: Map<string, Product24hrTick> = new Map();
    getRespProduct24hrTick().then(data => {
      const listData = data.data;
      listData.sort((a, b) => b.qv - a.qv);
      for (const value of listData) {
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

  function sortProductsMap(orderBy: string, newDesc: boolean) {
    setProducts(
      new Map(
        Array.from(products).sort((a, b) => {
          switch (orderBy) {
            case 'symbol':
              if (newDesc) return b[1].s > a[1].s ? 1 : -1;
              else return b[1].s > a[1].s ? -1 : 1;
              break;
            case 'lastPrice':
              if (newDesc) return b[1].c - a[1].c;
              else return a[1].c - b[1].c;
              break;
            case 'percentage':
              if (newDesc) return b[1].p - a[1].p;
              else return a[1].p - b[1].p;
              break;
            case 'volumn':
            default:
              if (newDesc) return b[1].qv - a[1].qv;
              else return a[1].qv - b[1].qv;
              break;
          }
        }),
      ),
    );
  }

  return { products, setProducts, sortProductsMap };
}
