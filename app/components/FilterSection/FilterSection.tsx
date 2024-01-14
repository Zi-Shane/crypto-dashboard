import { COIN_QUOTES, CURRENCY_QUOTE, QUOTE_GROUPS } from '@/constants';
import styles from './styles.module.css';
import { RefObject } from 'react';
import { GroupLabels, QuoteLabels } from '.';
import { SearchBox } from 'components';

type FilterLabelsProps = {
  quote: QuoteType;
  onQuoteChange: (group: string, name: string) => void;
  resetRef: RefObject<HTMLDivElement>;
  keyword: string;
  handleKeywordChange: (keyword: string) => void;
};

export function FilterSection({
  quote,
  onQuoteChange,
  resetRef,
  keyword,
  handleKeywordChange,
}: FilterLabelsProps) {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.tags} ref={resetRef}>
          <GroupLabels
            values={Object.values(QUOTE_GROUPS)}
            highlight={quote.group}
            onQuoteChange={onQuoteChange}
          />
        </div>
        <div className={`${styles.tags} ${styles.quoteTags}`}>
          <QuoteLabels
            values={
              quote.group === QUOTE_GROUPS.COIN
                ? Object.values(COIN_QUOTES)
                : Object.values(CURRENCY_QUOTE)
            }
            currentGroup={quote.group}
            highlight={quote.name}
            onQuoteChange={onQuoteChange}
          />
        </div>
      </div>
      <div className={styles.inputBox}>
        <SearchBox keyword={keyword} handleChange={handleKeywordChange} />
      </div>
    </div>
  );
}
