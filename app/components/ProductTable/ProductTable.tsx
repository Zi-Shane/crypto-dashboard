import { useFilter, usePagination, useProducts, useSort } from 'hooks';
import {
  TableData,
  FilterSection,
  Pagination,
  SearchBox,
} from 'components';
import { useRef } from 'react';

export function ProductTable() {
  const { quoteMap, products } = useProducts();
  const { filterdProducts, quote, updateQuote, keyword, updateKeyword } =
    useFilter({ products, quoteMap });
  const { sortedProducts, sortAttr, updateSortAttr } = useSort({
    products: filterdProducts,
  });
  const { pagedProducts, pageCount, page, updatePage } = usePagination({
    products: sortedProducts,
  });
  const resetRef = useRef<HTMLDivElement>(null);

  function handleQuoteChange(newGroup: string, newName: string) {
    updateQuote({ group: newGroup, name: newName });
    updatePage(1);
  }

  function handleKeywordChange(keyword: string) {
    updateKeyword(keyword);
    updatePage(1);
  }

  function handleSort(orderBy: string) {
    let newDesc = true;
    if (orderBy == sortAttr.column) {
      newDesc = !sortAttr.desc;
    }
    updateSortAttr({ column: orderBy, desc: newDesc });
    updatePage(1);
  }

  function scrollToElement() {
    if (resetRef.current) resetRef.current.scrollIntoView();
  }

  function handlePageChange(p: number) {
    updatePage(p);
    scrollToElement();
  }

  return (
    <div>
      <FilterSection
        quote={quote}
        onQuoteChange={handleQuoteChange}
        resetRef={resetRef}
        keyword={keyword}
        handleKeywordChange={handleKeywordChange}
      />
      <TableData
        products={pagedProducts}
        onSort={handleSort}
        sortAttr={sortAttr}
      />
      <Pagination
        pageCount={pageCount}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
