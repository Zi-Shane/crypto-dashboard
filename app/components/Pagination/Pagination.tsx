import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import styles from './styles.module.css';
import { Dispatch, SetStateAction } from 'react';
import { PaginationDots, PaginationItem } from './paginationItem';

type PaginationProps = {
  totalRows: number;
  currentPage: number;
  limit: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export function Pagination({
  totalRows,
  currentPage,
  limit,
  setPage,
}: PaginationProps) {
  const end =
    totalRows % limit == 0
      ? totalRows / limit
      : Math.floor(totalRows / limit) + 1;

  function handleAngleClick(add: number) {
    setPage(prev => {
      const newN = prev + add;
      if (newN <= end && newN > 0) {
        return newN;
      }
      return prev;
    });
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
      if (tmp[i] < start || tmp[i] > end) {
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
      if (tmp[5] == end) {
        value[6] = '';
      }
      if (tmp[5] < end) {
        value[6] = end.toString();
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
        divs.push(<PaginationDots key="fdot" />);
      }
      divs.push(
        <PaginationItem
          currentPage={currentPage}
          value={parseInt(value[i])}
          handlePageChange={() => setPage(parseInt(value[i]))}
        />,
      );
      if (i == 5 && parseInt(value[5]) + 1 < end) {
        divs.push(<PaginationDots key="edot" />);
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
          currentPage == end
            ? `${styles.button} ${styles.disabled}`
            : styles.button
        }
        onClick={() => handleAngleClick(1)}
      />
    </div>
  );
}
