'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { ProductInfo } from '@/data/type';

import {
  closeTickSocket,
  connectTickSocket,
  DefaultTick,
  handleSocketMessage,
  TickerData,
} from '@/API/websocket';
import { formateProduct, WebsocketMessage } from '@/API/formatStream';

import FilteredTable from './MarketTable/FilteredTable';

interface MarketTableProps {
  data: ProductInfo[];
}

const MarketTable = ({ data: initialData }: MarketTableProps) => {
  const [marketData, setMarketData] = useState<ProductInfo[]>(initialData);
  const skipPageResetRef = useRef<boolean>();

  // map of initialData => useMemo
  const marketMap = useMemo(() => {
    const map = new Map<string, ProductInfo>();
    initialData.forEach((item, index) => {
      map.set(item.symbol, item);
    });
    return map;
  }, [initialData]);

  const updateHelper = (messages: WebsocketMessage[]) => {
    // loop socket message find row from map and update value in map
    messages.forEach((item: WebsocketMessage) => {
      const row = marketMap.get(item.symbol);
      if (row) {
        marketMap.set(item.symbol, {
          ...row,
          open: item.open,
          current: item.current,
          high: item.height,
          low: item.low,
          high_low: item.high_low,
          percentage: item.percentage,
          volumn: item.volumn,
        });
      }
    });

    return Array.from(marketMap.values());
  };

  useEffect(() => {
    // Websocket connection setup
    connectTickSocket();

    handleSocketMessage(DefaultTick, (message: TickerData[]) => {
      // Set flag to prevent automatic state reset
      skipPageResetRef.current = true;

      // Update the data based on the received message
      const formatedMsg = formateProduct(message);
      const updatedData = updateHelper(formatedMsg);
      setMarketData(updatedData);
    });

    // Cleanup websocket on component unmount
    return () => {
      closeTickSocket();
    };
  }, [updateHelper]); // Empty dependency array means this runs once on mount

  return (
    <div>
      <FilteredTable
        marketData={marketData}
        skipPageResetRef={skipPageResetRef}
      />
      {/* <DataTable columns={columns} data={marketData} /> */}
      {/* <MarketList products={products} /> */}
    </div>
  );
};

export default MarketTable;
