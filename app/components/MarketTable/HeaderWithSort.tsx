import { SortDirection } from '@tanstack/react-table';
import React from 'react';

interface HeaderWithSortProps
  extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  sortStatus: false | SortDirection;
  onSort: () => void;
}

const HeaderWithSort = ({
  name,
  sortStatus,
  onSort,
  ...props
}: HeaderWithSortProps) => {
  return (
    <div {...props}>
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
