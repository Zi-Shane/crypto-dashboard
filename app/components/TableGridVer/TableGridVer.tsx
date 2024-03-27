import { number2unit } from 'utilties';
import { SortIcons } from 'components';
import styles from './styles.module.css';
import { COLUMNS } from '@/constants';

type TableDataProps = {
  products: Map<string, Product24hrTick>;
  onSort: (orderBy: string) => void;
  sortAttr: SortAttr;
};

const ColumnNames = {
  SYMBOL: 'Symbol',
  LAST_PRICE: 'Last Price',
  PERCENTAGE: '24hr Change',
  HIGH_LOW: '24hr High / Low',
  VOLUMN: 'Volume',
};

export function TableGridVer({
  products,
  onSort,
  sortAttr,
}: TableDataProps) {
  const classAlignLeft = `${styles.item} ${styles.alignLeft}`;
  const classAlignRight = `${styles.item} ${styles.alignRight}`;
  return (
    <div className={styles.container}>
      <div className={classAlignLeft}>
        {ColumnNames.SYMBOL}
        <SortIcons
          column={COLUMNS.SYMBOL}
          handleSort={() => onSort(COLUMNS.SYMBOL)}
          sortAttr={sortAttr}
        />
      </div>
      <div className={classAlignRight}>
        {ColumnNames.LAST_PRICE}
        <SortIcons
          column={COLUMNS.LAST_PRICE}
          handleSort={() => onSort(COLUMNS.LAST_PRICE)}
          sortAttr={sortAttr}
        />
      </div>
      <div className={classAlignRight}>
        {ColumnNames.PERCENTAGE}
        <SortIcons
          column={COLUMNS.PERCENTAGE}
          handleSort={() => onSort(COLUMNS.PERCENTAGE)}
          sortAttr={sortAttr}
        />
      </div>
      <div className={`${classAlignRight} ${styles.highlow}`}>
        {ColumnNames.HIGH_LOW}
      </div>
      <div className={`${classAlignRight} ${styles.volumn}`}>
        {ColumnNames.VOLUMN}
        <SortIcons
          column={COLUMNS.VOLUMN}
          handleSort={() => onSort(COLUMNS.VOLUMN)}
          sortAttr={sortAttr}
        />
      </div>

      {Array.from(products).map(([key, value]) => {
        return (
          <div key={key} className={styles.rowWrapper}>
            <div
              className={`${styles.item} ${styles.alignLeft} ${styles.head}`}
            >
              <span className={styles.symbolBase}>{value.b}</span>
              &nbsp;/&nbsp;{value.q}
            </div>
            <div className={`${styles.item} ${styles.alignRight}`}>
              <span>{Number(value.c).toFixed(2)}</span>
            </div>
            <div className={`${styles.item} ${styles.alignRight}`}>
              <span
                className={`${styles.mobilePercent} ${
                  value.p >= 0 ? styles.ups : styles.downs
                }`}
              >
                {(value.p * 100).toFixed(2)}%
              </span>
            </div>
            <div
              className={`${styles.item} ${styles.alignRight} ${styles.highlow}`}
            >
              <span>
                {Number(value.h).toFixed(2)}&nbsp;/&nbsp;
                {Number(value.l).toFixed(2)}
              </span>
            </div>
            <div
              className={`${styles.item} ${styles.alignRight} ${styles.tail} ${styles.volumn}`}
            >
              <span>{number2unit(value.qv, 2)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
