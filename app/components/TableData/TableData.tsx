import { number2unit } from '../../utilies';
import { SortIcons } from 'components';
import styles from './styles.module.css';
import { COLUMNS } from '@/constants';

type TableDataProps = {
  products: Map<string, Product24hrTick>;
  onSort: (orderBy: string) => void;
  sortAttr: SortAttr;
};

export function TableData({ products, onSort, sortAttr }: TableDataProps) {
  return (
    <div className={styles.table}>
      <div className={styles.tableHeaderRow}>
        <div className={`${styles.tableCell} ${styles.tableSymbolCell}`}>
          <span>Symbol</span>
          <SortIcons
            column={COLUMNS.SYMBOL}
            handleSort={() => onSort(COLUMNS.SYMBOL)}
            sortAttr={sortAttr}
          />
        </div>
        <div className={styles.tableCell}>
          <span>Last&nbsp;Price</span>
          <SortIcons
            column={COLUMNS.LAST_PRICE}
            handleSort={() => onSort(COLUMNS.LAST_PRICE)}
            sortAttr={sortAttr}
          />
        </div>
        <div className={styles.tableCell}>
          <span>24hr&nbsp;Price&nbsp;Change&nbsp;Percent</span>
          <SortIcons
            column={COLUMNS.PERCENTAGE}
            handleSort={() => onSort(COLUMNS.PERCENTAGE)}
            sortAttr={sortAttr}
          />
        </div>
        <div className={styles.tableCell}>
          <span>24hr&nbsp;High&nbsp;/&nbsp;Low</span>
        </div>
        <div className={styles.tableCell}>
          <span>Volume</span>
          <SortIcons
            column={COLUMNS.VOLUMN}
            handleSort={() => onSort(COLUMNS.VOLUMN)}
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
            <div
              className={`${styles.tableCell} ${
                value.p >= 0 ? styles.ups : styles.downs
              }`}
            >
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
