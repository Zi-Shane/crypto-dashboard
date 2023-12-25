import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import styles from './styles.module.css';
import { useState } from 'react';
import { sortAttr } from '..';

export function SortIcons({
  type,
  handleSort,
  sortByThis,
}: {
  type: string;
  handleSort: () => void;
  sortByThis: sortAttr;
}) {
  return (
    <div className={styles.columnFilter} onClick={handleSort}>
      <IoMdArrowDropup
        className={
          !sortByThis.desc && sortByThis.type === type
            ? `${styles.iconActive}`
            : ''
        }
      />
      <IoMdArrowDropdown
        className={
          sortByThis.desc && sortByThis.type === type
            ? `${styles.iconActive}`
            : ''
        }
      />
    </div>
  );
}
