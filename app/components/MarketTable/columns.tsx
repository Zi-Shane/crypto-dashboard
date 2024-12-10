'use client';

import { ProductInfo } from '@/data/type';
import { ColumnDef } from '@tanstack/react-table';
import HeaderWithSort from './HeaderWithSort';
import { COLUMNS } from '@/data/table';
import ConditionalPercentage from './ConditionalPercentage';
import { number2unit } from '@/lib/formater';

export const columns: ColumnDef<ProductInfo>[] = [
  {
    accessorKey: 'symbol',
    header: ({ column }) => {
      return (
        <HeaderWithSort
          className="w-[100px]"
          name={COLUMNS.SYMBOL}
          sortStatus={column.getIsSorted()}
          onSort={() =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        />
      );
    },
    cell: ({ row }) => {
      return <div className="w-[100px]">{row.getValue('symbol')}</div>;
    },
  },
  {
    accessorKey: 'current',
    header: ({ column }) => {
      return (
        <HeaderWithSort
          className="text-right"
          name={COLUMNS.LAST_PRICE}
          sortStatus={column.getIsSorted()}
          onSort={() =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        />
      );
    },
    cell: ({ row }) => {
      return <div className="text-right">${row.getValue('current')}</div>;
    },
  },
  {
    accessorKey: 'percentage',
    header: ({ column }) => {
      return (
        <HeaderWithSort
          className="text-center md:w-auto md:text-right"
          name={COLUMNS.PERCENTAGE}
          sortStatus={column.getIsSorted()}
          onSort={() =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center md:w-auto md:text-right">
          <ConditionalPercentage value={row.getValue('percentage')} />
        </div>
      );
    },
  },
  {
    accessorKey: 'volumn',
    header: ({ column }) => {
      return (
        <HeaderWithSort
          className="hidden text-right md:block"
          name={COLUMNS.VOLUMN}
          sortStatus={column.getIsSorted()}
          onSort={() =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="hidden text-right md:block">
          {number2unit(row.getValue('volumn'))}
        </div>
      );
    },
  },
];
