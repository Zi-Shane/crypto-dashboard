import { useProducts } from 'hooks';
import {
  TableData,
  FilterLabels,
  Pagination,
  tableReducer,
  ACTION_TYPE,
  INITIAL_STATE,
} from 'components';
import { PAGE_LIMIT } from '@/constants';
import { useReducer, useRef, useState } from 'react';

export function ProductTable() {
  const [tableStates, dispatch] = useReducer(tableReducer, INITIAL_STATE);
  const resetRef = useRef<HTMLDivElement>(null);
  const { selectedProducts } = useProducts(
    tableStates.quote.name,
    tableStates.sortAttr,
  );
  const pageCount = Math.ceil(selectedProducts.size / PAGE_LIMIT);

  function handleQuoteChange(newGroup: string, newName: string) {
    dispatch({
      type: ACTION_TYPE.UPDATE_QUOTE,
      payload: {
        ...tableStates,
        quote: { group: newGroup, name: newName },
        page: 1,
      },
    });
  }

  function handleSort(orderBy: string) {
    let newDesc = true;
    if (orderBy === tableStates.sortAttr.column) {
      newDesc = !tableStates.sortAttr.desc;
    }
    dispatch({
      type: ACTION_TYPE.SORT_DATA,
      payload: {
        ...tableStates,
        sortAttr: { column: orderBy, desc: newDesc },
        page: 1,
      },
    });
  }

  function scrollToElement() {
    if (resetRef.current) resetRef.current.scrollIntoView();
  }

  function handlePageChange(p: number) {
    dispatch({
      type: ACTION_TYPE.PAGE_CHANGE,
      payload: {
        ...tableStates,
        page: p,
      },
    });
    scrollToElement();
  }

  function getPage(products: Map<string, Product24hrTick>, page: number) {
    const start = (page - 1) * 10;
    const end = start + 10;
    const tmp = Array.from(products).slice(start, end);
    return new Map(tmp);
  }
  const products = getPage(selectedProducts, tableStates.page);

  return (
    <div>
      <FilterLabels
        quote={tableStates.quote}
        onQuoteChange={handleQuoteChange}
        resetRef={resetRef}
      />
      <TableData
        products={products}
        onSort={handleSort}
        sortAttr={tableStates.sortAttr}
      />
      <Pagination
        pageCount={pageCount}
        currentPage={tableStates.page}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
