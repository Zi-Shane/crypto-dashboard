import { useState } from 'react';
import { number2unit } from 'Utilies';
import styles from './styles.module.css';
import { SortIcons } from 'components';
import { useAllProducts } from 'hooks';

export function ProductTable() {
  const [sortAttr, setSortAttr] = useState<SortAttr>({
    type: 'volumn',
    desc: true,
  });
  const { products, setProducts, sortProductsMap } = useAllProducts();

  function handleSort(orderBy: string) {
    let newDesc = true;
    if (orderBy == sortAttr.type) {
      newDesc = !sortAttr.desc;
    }
    setSortAttr({ type: orderBy, desc: newDesc });
    sortProductsMap(orderBy, newDesc);
  }

  return (
    <div className={styles.table}>
      <div className={styles.tableHeaderRow}>
        <div className={`${styles.tableCell} ${styles.tableSymbolCell}`}>
          <span>Symbol</span>
          <SortIcons
            type="symbol"
            handleSort={() => handleSort('symbol')}
            sortAttr={sortAttr}
          />
        </div>
        <div className={styles.tableCell}>
          <span>Last&nbsp;Price</span>
          <SortIcons
            type="lastPrice"
            handleSort={() => handleSort('lastPrice')}
            sortAttr={sortAttr}
          />
        </div>
        <div className={styles.tableCell}>
          <span>24hr&nbsp;Price&nbsp;Change&nbsp;Percent</span>
          <SortIcons
            type="percentage"
            handleSort={() => handleSort('percentage')}
            sortAttr={sortAttr}
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
            sortAttr={sortAttr}
          />
        </div>
      </div>
      {Array.from(products).map(([key, value]) => {
        return (
          <div key={key} className={styles.tableRow}>
            <div
              className={`${styles.tableCell} ${styles.tableSymbolCell}`}
            >
              {value.s}
            </div>
            <div className={styles.tableCell}>
              {Number(value.c).toFixed(2)}
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
