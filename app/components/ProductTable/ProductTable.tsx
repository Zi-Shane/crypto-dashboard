import { useCallback, useEffect, useRef, useState } from 'react';
import {
  closeTickSocket,
  connectTickSocket,
  fromTickSocket,
  getTick24hr,
  productInfo,
  subscribeTickSocket,
  symbol24hr,
} from 'API';
import { number2unit, changedPercentage } from 'Utilies';
import styles from './styles.module.css';
import { SortIcons } from '../SortIcons';

export type sortAttr = { type: string; desc: boolean };

export function ProductTable() {
  const [prodcts, setProducts] = useState(new Map<string, symbol24hr>([]));
  const [sortBy, setSortBy] = useState({ type: 'volumn', desc: true });

  function getSymbol24hr() {
    let res: Map<string, symbol24hr> = new Map();
    getTick24hr().then(data => {
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

  const updateTable = useCallback(
    (productInfos: productInfo[]) => {
      productInfos.map(e => {
        const currentData = prodcts.get(e.s);
        if (currentData) {
          currentData.p = changedPercentage(e.o, e.c);
          currentData.l = e.c;
          currentData.h = e.h;
          currentData.c = e.l;
          currentData.qv = e.q;
          prodcts.set(e.s, currentData);
        }
      });
      setProducts(new Map(prodcts));
    },
    [prodcts],
  );

  useEffect(() => {
    connectTickSocket();
    subscribeTickSocket();
    fromTickSocket(updateTable);
    return () => {
      closeTickSocket();
    };
  }, [updateTable]);

  useEffect(() => {
    getSymbol24hr();
  }, []);

  function handleSort(curType: string) {
    let newDesc = true;
    if (curType == sortBy.type) {
      newDesc = !sortBy.desc;
    }
    setSortBy({ type: curType, desc: newDesc });
    setProducts(
      new Map(
        Array.from(prodcts).sort((a, b) => {
          switch (curType) {
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

  return (
    <div className={styles.table}>
      <div className={styles.tableHeaderRow}>
        <div className={`${styles.tableCell} ${styles.tableSymbolCell}`}>
          <span>Symbol</span>
          <SortIcons
            type="symbol"
            handleSort={() => handleSort('symbol')}
            sortByThis={sortBy}
          />
        </div>
        <div className={styles.tableCell}>
          <span>Last&nbsp;Price</span>
          <SortIcons
            type="lastPrice"
            handleSort={() => handleSort('lastPrice')}
            sortByThis={sortBy}
          />
        </div>
        <div className={styles.tableCell}>
          <span>24hr&nbsp;Price&nbsp;Change&nbsp;Percent</span>
          <SortIcons
            type="percentage"
            handleSort={() => handleSort('percentage')}
            sortByThis={sortBy}
          />
        </div>
        <div className={styles.tableCell}>
          <span>24hr&nbsp;High/Low</span>
        </div>
        <div className={styles.tableCell}>
          <span>Volume</span>
          <SortIcons
            type="volumn"
            handleSort={() => handleSort('volumn')}
            sortByThis={sortBy}
          />
        </div>
      </div>
      {Array.from(prodcts).map(([key, value]) => {
        return (
          <div key={key} className={styles.tableRow}>
            <div
              className={`${styles.tableCell} ${styles.tableSymbolCell}`}
            >
              {value.s}
            </div>
            <div className={styles.tableCell}>
              {Number(value.l).toFixed(2)}
            </div>
            <div className={styles.tableCell}>
              {(value.p * 100).toFixed(2)}%
            </div>
            <div className={styles.tableCell}>
              {Number(value.h).toFixed(2)}&nbsp;/&nbsp;
              {Number(value.l).toFixed(2)}
            </div>
            <div className={styles.tableCell}>
              {number2unit(value.qv, 2)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
