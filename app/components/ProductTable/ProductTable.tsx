import { useFilter, usePagination, useProducts, useSort } from 'hooks';
import { TableData, FilterSection, Pagination } from 'components';
import { useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  function handleQuoteChange(newGroup: string, newName: string) {
    current.set('group', newGroup);
    current.set('name', newName);
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`);

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
