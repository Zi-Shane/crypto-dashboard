import { ProductInfo } from '@/data/type';
import {
  getRespProduct24hrTick,
  Product24hrTick,
  RespProduct24hrTick,
} from './fetchData';
import { calPercentage, stringifyHighLow } from '@/lib/formater';

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
        high: item.h,
        low: item.l,
        high_low: stringifyHighLow(item.l, item.h),
        percentage: calPercentage(Number(item.o), Number(item.c)),
        volumn: item.qv,
        tags: item.tags,
      };
    });
  prodctsInfo.sort((a, b) => parseFloat(b.volumn) - parseFloat(a.volumn));
  return prodctsInfo;
}
