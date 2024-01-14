import { COIN_QUOTES, CURRENCY_QUOTE, QUOTE_GROUPS } from '@/constants';
import styles from './styles.module.css';

type LabelProps = {
  value: string;
  isCurrentValue: boolean;
  handleQuoteChange: () => void;
};

type GroupLabelsProps = {
  values: string[];
  highlight: string;
  onQuoteChange: (newGroup: string, newName: string) => void;
};

type QuoteLabelsProps = {
  values: string[];
  currentGroup: string;
  highlight: string;
  onQuoteChange: (newGroup: string, newName: string) => void;
};

function Label({ value, isCurrentValue, handleQuoteChange }: LabelProps) {
  return (
    <span
      className={`${styles.tag} ${isCurrentValue ? styles.active : ''}`}
      onClick={() => handleQuoteChange()}
    >
      {value}
    </span>
  );
}

export function GroupLabels({
  values,
  highlight,
  onQuoteChange,
}: GroupLabelsProps) {
  return values.map(value => {
    return (
      <Label
        key={
          value === QUOTE_GROUPS.COIN
            ? QUOTE_GROUPS.COIN
            : QUOTE_GROUPS.CURRENCY
        }
        value={value}
        isCurrentValue={highlight === value} // boolean
        handleQuoteChange={() =>
          onQuoteChange(
            value,
            value === QUOTE_GROUPS.COIN
              ? Object.values(COIN_QUOTES)[0]
              : Object.values(CURRENCY_QUOTE)[0],
          )
        }
      />
    );
  });
}

export function QuoteLabels({
  values,
  currentGroup,
  highlight,
  onQuoteChange,
}: QuoteLabelsProps) {
  return values.map(value => {
    return (
      <Label
        key={value}
        value={value}
        isCurrentValue={highlight === value}
        handleQuoteChange={() => onQuoteChange(currentGroup, value)}
      />
    );
  });
}
