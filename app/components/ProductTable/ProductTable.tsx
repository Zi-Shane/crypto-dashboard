import { useProducts } from 'hooks';
import { TableData } from 'components';
import { column } from '@/constants';
import { useState } from 'react';
import { FilterLabels } from '../FilterLabels';

export function ProductTable() {
  const [quoteType, setQuoteType] = useState('Currency');
  const [quote, setQuote] = useState('ALL');
  const [sortAttr, setSortAttr] = useState({
    type: column.volumn,
    desc: true,
  });
  const { selectedProduct } = useProducts(quote, sortAttr);

  function handleSort(orderBy: string) {
    let newDesc = true;
    if (orderBy == sortAttr.type) {
      newDesc = !sortAttr.desc;
    }
    setSortAttr({ type: orderBy, desc: newDesc });
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
