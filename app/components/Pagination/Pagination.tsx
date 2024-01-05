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
  const end =
    totalRows % 10 == 0 ? totalRows / 10 : Math.floor(totalRows / 10) + 1;

  function controlAngle(add: number) {
    setPage(prev => {
      const newN = prev + add;
      if (newN <= end && newN > 0) {
        return newN;
      }
      return prev;
    });
  }

  function generatePageN() {
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
        divs.push(<div key={'fdot'}>...</div>);
      }
      divs.push(
        <div
          key={value[i]}
          className={
            currentPage == parseInt(value[i])
              ? `${styles.link} ${styles.active}`
              : styles.link
          }
          onClick={() => setPage(parseInt(value[i]))}
        >
          {value[i]}
        </div>,
      );
      if (i == 5 && parseInt(value[5]) + 1 < end) {
        divs.push(<div key={'edot'}>...</div>);
      }
    }

    return <div className={styles.links}>{divs}</div>;
  }

  const generatedDivs = generatePageN();

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
          currentPage == end
            ? `${styles.button} ${styles.disabled}`
            : styles.button
        }
        onClick={() => controlAngle(1)}
      />
    </div>
  );
}
