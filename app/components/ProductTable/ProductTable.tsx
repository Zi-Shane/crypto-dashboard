import { useProducts } from 'hooks';
import { TableData, FilterLabels, Pagination } from 'components';
import {
  CoinQuotes,
  QuoteGroup,
  ColumnName,
  PAGE_LIMIT,
} from '@/constants';
import { useEffect, useRef, useState } from 'react';

export function ProductTable() {
  const [quote, setQuote] = useState({
    group: QuoteGroup.coin,
    name: CoinQuotes[0],
  });
  const [sortAttr, setSortAttr] = useState<SortAttr>({
    column: ColumnName.volumn,
    desc: true,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const { selectedProduct, totalRows } = useProducts(
    quote.name,
    sortAttr,
    currentPage,
  );
  const resetRef = useRef<HTMLDivElement>(null);

  useEffect(() => setCurrentPage(1), [quote]);
  useEffect(() => scrollToElement(), [currentPage]);

  function scrollToElement() {
    // Get a reference to the target element
    // var targetElement = document.getElementById('targetElement');

    // Scroll to the target element
    if (resetRef.current) resetRef.current.scrollIntoView();
  }

  function handleSort(orderBy: ColumnName) {
    let newDesc = true;
    if (orderBy == sortAttr.column) {
      newDesc = !sortAttr.desc;
    }
    setSortAttr({ column: orderBy, desc: newDesc });
  }

  return (
    <div>
      <FilterLabels
        quote={quote}
        setQuote={setQuote}
        resetRef={resetRef}
      />
      <TableData
        products={selectedProduct}
        handleSort={handleSort}
        sortAttr={sortAttr}
      />
      <Pagination
        totalRows={totalRows}
        currentPage={currentPage}
        limit={PAGE_LIMIT}
        setPage={setCurrentPage}
      />
    </div>
  );
}
