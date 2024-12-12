import { calPercentage, stringifyHighLow } from '@/lib/formater';
import { TickerData } from './websocket';

export function formateProduct(data: TickerData[]) {
  const formatedData: WebsocketMessage[] = data.map(item => {
    return {
      type: item.e,
      id: item.E,
      symbol: item.s,
      current: item.c,
      open: item.o,
      height: item.h,
      low: item.l,
      high_low: stringifyHighLow(item.l, item.h),
      volumn: item.q,
      percentage: calPercentage(parseFloat(item.o), parseFloat(item.c)),
    };
  });
  return formatedData;
}

export type WebsocketMessage = {
  type: string;
  id: number;
  symbol: string;
  current: string;
  open: string;
  height: string;
  low: string;
  high_low: string;
  volumn: string;
  percentage: number;
};
