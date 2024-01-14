import { COLUMNS } from '@/constants';
import { useState } from 'react';

type useSortProps = {
  products: Map<string, Product24hrTick>;
};

type useSortRet = {
  sortedProducts: Map<string, Product24hrTick>;
  sortAttr: SortAttr;
  updateSortAttr: (sortAttr: SortAttr) => void;
};

export function useSort({ products }: useSortProps): useSortRet {
  const [sortAttr, setSortAttr] = useState<SortAttr>({
    column: COLUMNS.VOLUMN,
    desc: true,
  });

  function updateSortAttr(sortAttr: SortAttr) {
    setSortAttr(sortAttr);
  }

  function sortProductsMap(
    orderBy: string,
    newDesc: boolean,
    products: Map<string, Product24hrTick>,
  ): Map<string, Product24hrTick> {
    return new Map(
      Array.from(products).sort((a, b) => {
        switch (orderBy) {
          case COLUMNS.SYMBOL:
            if (newDesc) return b[1].s > a[1].s ? 1 : -1;
            else return b[1].s > a[1].s ? -1 : 1;
            break;
          case COLUMNS.LAST_PRICE:
            if (newDesc) return b[1].c - a[1].c;
            else return a[1].c - b[1].c;
            break;
          case COLUMNS.PERCENTAGE:
            if (newDesc) return b[1].p - a[1].p;
            else return a[1].p - b[1].p;
            break;
          case COLUMNS.VOLUMN:
          default:
            if (newDesc) return b[1].qv - a[1].qv;
            else return a[1].qv - b[1].qv;
            break;
        }
      }),
    );
  }

  const sortedProducts = sortProductsMap(
    sortAttr.column,
    sortAttr.desc,
    products,
  );
  return { sortedProducts, sortAttr, updateSortAttr };
}
