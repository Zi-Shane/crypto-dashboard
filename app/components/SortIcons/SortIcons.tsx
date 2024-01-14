import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import styles from './styles.module.css';
import { COLUMNS } from '@/constants';

export function SortIcons({
  column,
  handleSort,
  sortAttr,
}: {
  column: string;
  handleSort: () => void;
  sortAttr: SortAttr;
}) {
  return (
    <div className={styles.columnFilter} onClick={handleSort}>
      <IoMdArrowDropup
        className={
          !sortAttr.desc && sortAttr.column === column
            ? `${styles.iconActive}`
            : ''
        }
      />
      <IoMdArrowDropdown
        className={
          sortAttr.desc && sortAttr.column === column
            ? `${styles.iconActive}`
            : ''
        }
      />
    </div>
  );
}
