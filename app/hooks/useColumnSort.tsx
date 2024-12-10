import { COLUMNS, SortStatus } from '@/data/table';
import React, { useState } from 'react';

const useColumnSort = () => {
  const [sortColumn, setSortColumn] = useState<string>(COLUMNS.VOLUMN);
  const [sortStatus, setSortStatus] = useState<SortStatus>('desc');
  // Handle sorting logic
  const handleSort = (columnName: string) => {
    // If clicking the same column, cycle through sort statuses
    if (sortColumn === columnName) {
      switch (sortStatus) {
        case '':
          setSortStatus('desc');
          break;
        case 'desc':
          setSortStatus('asc');
          break;
        case 'asc':
          setSortStatus('desc');
          break;
      }
    } else {
      // If clicking a different column, reset to ascending
      setSortColumn(columnName);
      setSortStatus('desc');
    }
  };

  return { sortColumn, sortStatus, handleSort };
};

export default useColumnSort;
