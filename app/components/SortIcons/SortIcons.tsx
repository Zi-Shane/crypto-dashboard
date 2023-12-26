import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import styles from './styles.module.css';

export function SortIcons({
  type,
  handleSort,
  sortAttr,
}: {
  type: string;
  handleSort: () => void;
  sortAttr: SortAttr;
}) {
  return (
    <div className={styles.columnFilter} onClick={handleSort}>
      <IoMdArrowDropup
        className={
          !sortAttr.desc && sortAttr.type === type
            ? `${styles.iconActive}`
            : ''
        }
      />
      <IoMdArrowDropdown
        className={
          sortAttr.desc && sortAttr.type === type
            ? `${styles.iconActive}`
            : ''
        }
      />
    </div>
  );
}
