import styles from './styles.module.css';

type PaginationItemProps = {
  currentPage: number;
  value: number;
  handlePageChange: () => void;
};

export function PaginationItem({
  currentPage,
  value,
  handlePageChange,
}: PaginationItemProps) {
  return (
    <div
      key={value}
      className={
        currentPage == value
          ? `${styles.link} ${styles.active}`
          : styles.link
      }
      onClick={() => handlePageChange()}
    >
      {value}
    </div>
  );
}

export function PaginationDots() {
  return <div>...</div>;
}
