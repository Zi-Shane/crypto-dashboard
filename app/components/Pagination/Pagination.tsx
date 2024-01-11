import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import styles from './styles.module.css';
import { PaginationDots, PaginationItem } from '.';

type PaginationProps = {
  pageCount: number;
  currentPage: number;
  onPageChange: (p: number) => void;
};

export function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  function handleAngleClick(add: number) {
    const newN = currentPage + add;
    if (newN <= pageCount && newN > 0) {
      return onPageChange(newN);
    }
  }

  function generatePageItems() {
    const divs = [];
    let value: string[] = Array(7).fill('');
    let tmp: number[] = Array(7).fill(0);
    const start = 1;
    // tmp[0] = start;
    tmp[1] = currentPage - 2;
    tmp[2] = currentPage - 1;
    tmp[3] = currentPage;
    tmp[4] = currentPage + 1;
    tmp[5] = currentPage + 2;
    // tmp[6] = end;
    for (let i = 1; i <= 5; i++) {
      if (tmp[i] < start || tmp[i] > pageCount) {
        value[i] = '';
      } else {
        value[i] = tmp[i] + '';
      }
    }

    if (value[1] != '') {
      if (tmp[1] == start) {
        value[0] = '';
      }
      if (tmp[1] > start) {
        value[0] = start.toString();
      }
    }

    if (value[5] != '') {
      if (tmp[5] == pageCount) {
        value[6] = '';
      }
      if (tmp[5] < pageCount) {
        value[6] = pageCount.toString();
      }
    }

    // 1...34'5'67...9
    // 12'3'456
    // 123'4'56
    for (let i = 0; i < 7; i++) {
      if (value[i] == '') {
        continue;
      }
      if (i == 1 && parseInt(value[1]) - 1 > start) {
        divs.push(<PaginationDots />);
      }
      divs.push(
        <PaginationItem
          key={value[i]}
          currentPage={currentPage}
          value={parseInt(value[i])}
          handlePageChange={() => onPageChange(parseInt(value[i]))}
        />,
      );
      if (i == 5 && parseInt(value[5]) + 1 < pageCount) {
        divs.push(<PaginationDots />);
      }
    }

    return <div className={styles.links}>{divs}</div>;
  }

  const generatedItems = generatePageItems();

  return (
    <div className={styles.container}>
      <FaAngleLeft
        className={
          currentPage == 1
            ? `${styles.button} ${styles.disabled}`
            : styles.button
        }
        onClick={() => handleAngleClick(-1)}
      />
      {generatedItems}
      <FaAngleRight
        className={
          currentPage == pageCount
            ? `${styles.button} ${styles.disabled}`
            : styles.button
        }
        onClick={() => handleAngleClick(1)}
      />
    </div>
  );
}
