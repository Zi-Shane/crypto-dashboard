import { PAGE_LIMIT } from '@/constants';
import { useState } from 'react';

type usePaginationProps = {
  products: Map<string, Product24hrTick>;
};

type usePaginationRet = {
  pagedProducts: Map<string, Product24hrTick>;
  pageCount: number;
  page: number;
  updatePage: (p: number) => void;
};

export function usePagination({
  products,
}: usePaginationProps): usePaginationRet {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(products.size / PAGE_LIMIT);

  function updatePage(p: number) {
    setPage(p);
  }

  function getPage(products: Map<string, Product24hrTick>, page: number) {
    const start = (page - 1) * 10;
    const end = start + 10;
    const tmp = Array.from(products).slice(start, end);
    return new Map(tmp);
  }

  const pagedProducts = getPage(products, page);
  return { pagedProducts, pageCount, page, updatePage };
}
