'use client';

import {
  ColumnDef,
  flexRender,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  PaginationState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useEffect, useState } from 'react';
import MarketListPagination from './MarketListPagination';
import SearchBox from '../MarketGroup/SearchBox';
import { useRouter, useSearchParams } from 'next/navigation';
import TableFilter from '../TableFilter';
import { FiltersL1 } from '@/data/filters';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    [],
  );
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });

  // useEffect(() => {
  //   router.push(`?page=${table.getState().pagination.pageIndex + 1}`, {
  //     scroll: false,
  //   });
  // }, [pagination]);

  useEffect(() => {
    const page = parseInt(searchParams.get('page') as string, 10);
    if (!isNaN(page)) {
      table.setPageIndex(page - 1);
    }
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  });

  function goPrevPage() {
    if (table.getCanPreviousPage()) {
      table.previousPage();
    }
  }

  function goNextPage() {
    if (table.getCanNextPage()) {
      table.nextPage();
    }
  }

  return (
    <>
      <SearchBox
        value={
          (table.getColumn('symbol')?.getFilterValue() as string) ?? ''
        }
        onChange={event =>
          table.getColumn('symbol')?.setFilterValue(event.target.value)
        }
      />
      <TableFilter className="my-4 px-3" />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id} className="hover:bg-inherit">
              {headerGroup.headers.map(header => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext(),
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <MarketListPagination
        className="my-4 justify-end"
        goPrevPage={() => goPrevPage()}
        goNextPage={() => goNextPage()}
        hasPrevPg={table.getCanPreviousPage()}
        hasNextPg={table.getCanNextPage()}
        currPg={table.getState().pagination.pageIndex + 1}
        lastPg={table.getPageCount()}
      />
    </>
  );
}
