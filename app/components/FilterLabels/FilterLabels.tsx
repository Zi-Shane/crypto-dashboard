import { CoinQuotes, CurrencyQuotes, QuoteGroup } from '@/constants';
import styles from './styles.module.css';
import { Dispatch, SetStateAction } from 'react';

export function FilterLabels({
  quote,
  setQuote,
}: {
  quote: QuoteAttr;
  setQuote: Dispatch<SetStateAction<QuoteAttr>>;
}) {
  function updateQuoteAttr(group: string, name: string) {
    setQuote({ group, name });
  }

  return (
    <>
      <div className={styles.tags}>
        <span
          className={`${styles.tag} ${
            QuoteGroup.coin == quote.group ? styles.active : ''
          }`}
          onClick={() => updateQuoteAttr(QuoteGroup.coin, CoinQuotes[0])}
        >
          Coin
        </span>
        <span
          className={`${styles.tag} ${
            QuoteGroup.currency == quote.group ? styles.active : ''
          }`}
          onClick={() =>
            updateQuoteAttr(QuoteGroup.currency, CurrencyQuotes[0])
          }
        >
          National Currency
        </span>
      </div>
      <div className={`${styles.tags} ${styles.quoteTags}`}>
        {quote.group === QuoteGroup.coin
          ? CoinQuotes.map(v => {
              return (
                <span
                  key={v}
                  className={`${styles.tag} ${
                    v == quote.name ? styles.active : ''
                  }`}
                  onClick={() => updateQuoteAttr(quote.group, v)}
                >
                  {v}
                </span>
              );
            })
          : CurrencyQuotes.map(v => {
              return (
                <span
                  key={v}
                  className={`${styles.tag} ${
                    v == quote.name ? styles.active : ''
                  }`}
                  onClick={() => updateQuoteAttr(quote.group, v)}
                >
                  {v}
                </span>
              );
            })}
      </div>
    </>
  );
}
