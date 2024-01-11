import { useProducts } from 'hooks';
import { TableData, FilterLabels, Pagination } from 'components';
import {
  QUOTE_GROUPS,
  COLUMNS,
  PAGE_LIMIT,
  COIN_QUOTES,
} from '@/constants';
import { useRef, useState } from 'react';

export function ProductTable() {
  const [quote, setQuote] = useState<QuoteType>({
    group: QUOTE_GROUPS.COIN,
    name: Object.values(COIN_QUOTES)[0],
  });
  const [sortAttr, setSortAttr] = useState<SortAttr>({
    column: COLUMNS.VOLUMN,
    desc: true,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const { selectedProducts } = useProducts(
    quote.name,
    sortAttr,
    currentPage,
  );
  const resetRef = useRef<HTMLDivElement>(null);
  const pageCount = Math.ceil(selectedProducts.size / PAGE_LIMIT);

  function handleQuoteChange(newGroup: string, newName: string) {
    setQuote({ group: newGroup, name: newName });
    setCurrentPage(1);
  }

  function getPage(products: Map<string, Product24hrTick>, page: number) {
    const start = (page - 1) * 10;
    const end = start + 10;
    const tmp = Array.from(products).slice(start, end);
    return new Map(tmp);
  }
  const products = getPage(selectedProducts, currentPage);

  function handleSort(orderBy: string) {
    let newDesc = true;
    if (orderBy == sortAttr.column) {
      newDesc = !sortAttr.desc;
    }
    setSortAttr({ column: orderBy, desc: newDesc });
    setCurrentPage(1);
  }

  function scrollToElement() {
    if (resetRef.current) resetRef.current.scrollIntoView();
  }

  function handlePageChange(p: number) {
    setCurrentPage(p);
    scrollToElement();
  }

  return (
    <div>
      <FilterLabels
        quote={quote}
        onQuoteChange={handleQuoteChange}
        resetRef={resetRef}
      />
      <TableData
        products={products}
        onSort={handleSort}
        sortAttr={sortAttr}
      />
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
