'use client';

import { ProductInfo } from '@/data/type';
import { COLUMNS } from '@/data/table';
import { number2unit } from '@/lib/formater';
import HeaderWithSort from './HeaderWithSort';
import ConditionalPercentage from './ConditionalPercentage';
import { ColumnDef } from '@tanstack/react-table';

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
      return (
        <div className="text-right">
          ${Number(row.getValue('current')).toFixed(2)}
        </div>
      );
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
    accessorKey: 'high_low',
    header: ({ column }) => {
      return (
        <div className="hidden min-w-[150px] text-right md:block">
          <span>{COLUMNS.HIGH_LOW}</span>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="hidden min-w-[150px] text-right md:block">
          {row.getValue(COLUMNS.HIGH_LOW)}
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
