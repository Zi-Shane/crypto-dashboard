import { column } from '@/constants';

export function sortProductsMap(
  orderBy: string,
  newDesc: boolean,
  products: Map<string, Product24hrTick>,
): Map<string, Product24hrTick> {
  return new Map(
    Array.from(products).sort((a, b) => {
      switch (orderBy) {
        case column.symbol:
          if (newDesc) return b[1].s > a[1].s ? 1 : -1;
          else return b[1].s > a[1].s ? -1 : 1;
          break;
        case column.lastPrice:
          if (newDesc) return b[1].c - a[1].c;
          else return a[1].c - b[1].c;
          break;
        case column.percentage:
          if (newDesc) return b[1].p - a[1].p;
          else return a[1].p - b[1].p;
          break;
        case column.volumn:
        default:
          if (newDesc) return b[1].qv - a[1].qv;
          else return a[1].qv - b[1].qv;
          break;
      }
    }),
  );
}
