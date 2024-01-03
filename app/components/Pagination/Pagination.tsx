import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import styles from './styles.module.css';
import { Dispatch, SetStateAction } from 'react';

type PaginationProps = {
  totalRows: number;
  currentPage: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export function Pagination({
  totalRows,
  currentPage,
  setPage,
}: PaginationProps) {
  const totalpages =
    totalRows % 10 == 0 ? totalRows / 10 : totalRows / 10 + 1;

  function controlAngle(add: number) {
    setPage(prev => {
      const newN = prev + add;
      if (newN <= totalpages && newN > 0) {
        return newN;
      }
      return prev;
    });
  }

  function generateDivs(n: number) {
    const divs = [];
    for (let i = 1; i <= n; i++) {
      divs.push(
        <div
          key={i}
          className={
            currentPage === i
              ? `${styles.link} ${styles.active}`
              : styles.link
          }
          onClick={() => setPage(i)}
        >
          {i}
        </div>,
      );
    }

    return <div className={styles.links}>{divs}</div>;
  }

  const generatedDivs = generateDivs(totalpages);

  return (
    <div className={styles.container}>
      <FaAngleLeft
        className={
          currentPage == 1
            ? `${styles.button} ${styles.disabled}`
            : styles.button
        }
        onClick={() => controlAngle(-1)}
      />
      {generatedDivs}
      <FaAngleRight
        className={
          currentPage == totalpages
            ? `${styles.button} ${styles.disabled}`
            : styles.button
        }
        onClick={() => controlAngle(1)}
      />
    </div>
  );
}
