import { number2unit } from 'Utilies';
import { SortIcons } from 'components';
import styles from './styles.module.css';
import { column } from '@/constants';

type TableDataProps = {
  products: Map<string, Product24hrTick>;
  handleSort: (orderBy: string) => void;
  sortAttr: SortAttr;
};

export function TableData({
  products,
  handleSort,
  sortAttr,
}: TableDataProps) {
  return (
    <div className={styles.table}>
      <div className={styles.tableHeaderRow}>
        <div className={`${styles.tableCell} ${styles.tableSymbolCell}`}>
          <span>Symbol</span>
          <SortIcons
            type={column.symbol}
            handleSort={() => handleSort(column.symbol)}
            sortAttr={sortAttr}
          />
        </div>
        <div className={styles.tableCell}>
          <span>Last&nbsp;Price</span>
          <SortIcons
            type={column.lastPrice}
            handleSort={() => handleSort(column.lastPrice)}
            sortAttr={sortAttr}
          />
        </div>
        <div className={styles.tableCell}>
          <span>24hr&nbsp;Price&nbsp;Change&nbsp;Percent</span>
          <SortIcons
            type={column.percentage}
            handleSort={() => handleSort(column.percentage)}
            sortAttr={sortAttr}
          />
        </div>
        <div className={styles.tableCell}>
          <span>24hr&nbsp;High&nbsp;/&nbsp;Low</span>
        </div>
        <div className={styles.tableCell}>
          <span>Volume</span>
          <SortIcons
            type={column.volumn}
            handleSort={() => handleSort(column.volumn)}
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
              <span className={styles.symbolBase}>{value.b}</span>
              &nbsp;/&nbsp;{value.q}
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
