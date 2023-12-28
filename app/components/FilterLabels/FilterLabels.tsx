import { CoinQuote, CurrencyQuotes } from '@/constants';
import styles from './styles.module.css';
import { Dispatch, SetStateAction } from 'react';

export function FilterLabels({
  quote,
  setQuote,
}: {
  quote: string;
  setQuote: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <div className={styles.tags}>
        <span className={styles.tag}>National Currency</span>
        <span className={styles.tag}>Coin</span>
      </div>
      <div className={`${styles.tags} ${styles.quoteTags}`}>
        <span
          className={`${styles.tag} ${
            'ALL' == quote ? styles.active : ''
          }`}
          onClick={() => setQuote('ALL')}
        >
          ALL
        </span>
        {CoinQuote.map(v => {
          return (
            <span
              key={v}
              className={`${styles.tag} ${
                v == quote ? styles.active : ''
              }`}
              onClick={() => setQuote(v)}
            >
              {v}
            </span>
          );
        })}
        <span className={styles.divider}>|</span>
        {CurrencyQuotes.map(v => {
          return (
            <span
              key={v}
              className={`${styles.tag} ${
                v == quote ? styles.active : ''
              }`}
              onClick={() => setQuote(v)}
            >
              {v}
            </span>
          );
        })}
      </div>
    </>
  );
}
