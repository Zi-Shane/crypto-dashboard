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
  VisibilityState,
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  skipPageResetRef: React.MutableRefObject<boolean | undefined>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  skipPageResetRef,
}: DataTableProps<TData, TValue>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'volumn', desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    [],
  );
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({
      symbol: true,
      current: true,
      percentage: true,
      high_low: true,
      volumn: true,
    });

  useEffect(() => {
    const page = parseInt(searchParams.get('p') as string, 10);
    if (!isNaN(page)) {
      table.setPageIndex(page - 1);
    }
  }, []);

  useEffect(() => {
    // Reset the flag after the table has updated
    skipPageResetRef.current = false;
  });

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
    onColumnVisibilityChange: setColumnVisibility,
    autoResetPageIndex: !skipPageResetRef.current,
    autoResetExpanded: !skipPageResetRef.current,
    state: {
      sorting,
      columnFilters,
      pagination,
      columnVisibility,
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
        goPage={n => table.setPageIndex(n)}
      />
    </>
  );
}
