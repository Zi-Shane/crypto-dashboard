import { useProducts } from 'hooks';
import { TableData, FilterLabels } from 'components';
import { CoinQuotes, QuoteGroup, ColumnName } from '@/constants';
import { useState } from 'react';

export function ProductTable() {
  const [quote, setQuote] = useState({
    group: QuoteGroup.coin,
    name: CoinQuotes[0],
  });
  const [sortAttr, setSortAttr] = useState<SortAttr>({
    column: ColumnName.volumn,
    desc: true,
  });
  const { selectedProduct } = useProducts(quote.name, sortAttr);

  function handleSort(orderBy: ColumnName) {
    let newDesc = true;
    if (orderBy == sortAttr.column) {
      newDesc = !sortAttr.desc;
    }
    setSortAttr({ column: orderBy, desc: newDesc });
  }

  return (
    <div>
      <FilterLabels quote={quote} setQuote={setQuote} />
      <TableData
        products={selectedProduct}
        handleSort={handleSort}
        sortAttr={sortAttr}
      />
    </div>
  );
}
