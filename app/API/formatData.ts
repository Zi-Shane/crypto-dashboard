import { ProductInfo } from '@/data/type';
import {
  getRespProduct24hrTick,
  Product24hrTick,
  RespProduct24hrTick,
} from './fetchData';

export async function getProductsInfo() {
  const resp: RespProduct24hrTick = await getRespProduct24hrTick();
  const respData: Product24hrTick[] = resp.data;
  const prodctsInfo: ProductInfo[] = respData
    .filter(item => item.q === 'USDT')
    .map(item => {
      return {
        symbol: item.s,
        base: item.b,
        quote: item.q,
        quoteName: item.qn,
        current: item.c,
        open: item.o,
        percentage: calPercentage(Number(item.o), Number(item.c)),
        volumn: item.qv,
        tags: item.tags,
      };
    });
  return prodctsInfo;
}

// async function sortProducts() {
//   let products: ProductsInfo[] = await getProductsInfo();
//   products.sort((a, b) => b.qv - a.qv);
// }

export function calPercentage(open: number, current: number): number {
  return (current - open) / open;
}
