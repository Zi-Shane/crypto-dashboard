import { FaSearch } from 'react-icons/fa';
import styles from './styles.module.css';

type SearchBoxProps = {
  keyword: string;
  handleChange: (keyword: string) => void;
};

export function SearchBox({ keyword, handleChange }: SearchBoxProps) {
  return (
    <div className={styles.container}>
      <FaSearch />
      <input
        className={styles.inputBox}
        type="text"
        onChange={e => handleChange(e.target.value)}
        value={keyword}
      />
    </div>
  );
}
