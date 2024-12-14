'use client';

import { ProductInfo } from '@/data/type';
import { COLUMNS } from '@/data/table';
import { number2unit } from '@/lib/formater';
import HeaderWithSort from './HeaderWithSort';
import ConditionalPercentage from './ConditionalPercentage';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<ProductInfo>[] = [
  {
    accessorKey: COLUMNS.BASE,
    header: ({ column }) => {
      return (
        <HeaderWithSort
          className="min-w-[100px]"
          name={COLUMNS.BASE}
          sortStatus={column.getIsSorted()}
          onSort={() =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="min-w-[100px]">
          <img
            className="mr-2 inline-block h-6 w-6"
            src={`/crypto-icon/${row.original.base}.png`}
            alt={`${row.original.base}`}
          ></img>
          {row.getValue(COLUMNS.BASE)}
        </div>
      );
    },
  },
  {
    accessorKey: 'current',
    header: ({ column }) => {
      return (
        <HeaderWithSort
          className="min-w-[100px] text-right"
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
        <div className="min-w-[100px] text-right">
          $
          {Number(row.getValue(COLUMNS.LAST_PRICE)) < 1
            ? parseInt(row.getValue(COLUMNS.LAST_PRICE)).toFixed(8)
            : parseInt(row.getValue(COLUMNS.LAST_PRICE)).toFixed(2)}
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
          <ConditionalPercentage
            value={row.getValue(COLUMNS.PERCENTAGE)}
          />
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
          {number2unit(row.getValue(COLUMNS.VOLUMN))}
        </div>
      );
    },
  },
];
