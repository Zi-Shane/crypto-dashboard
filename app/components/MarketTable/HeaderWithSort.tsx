import { SortStatus } from '@/data/table';
import { SortDirection } from '@tanstack/react-table';
import React from 'react';

interface HeaderWithSortProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  sortStatus: false | SortDirection;
  onSort: () => void;
}

const HeaderWithSort = ({
  name,
  sortStatus,
  onSort,
  className,

  ...props
}: HeaderWithSortProps) => {
  return (
    <div className={className}>
      <span>
        {name}
        <img
          src={
            sortStatus === 'asc'
              ? 'sort-icons/sort-up-f.svg'
              : sortStatus === 'desc'
                ? 'sort-icons/sort-down-f.svg'
                : 'sort-icons/sort-small-f.svg'
          }
          alt="sort"
          className="inline-block"
          onClick={onSort}
        />
      </span>
    </div>
  );
};

export default HeaderWithSort;
