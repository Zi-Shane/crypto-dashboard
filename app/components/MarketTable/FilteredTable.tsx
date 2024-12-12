import React, { useState } from 'react';
import { columns } from './columns';
import { ProductInfo } from '@/data/type';
import { DataTable } from './DataTable';
import TableFilter from './TableFilter';
import { DefaultFilter } from '@/data/filters';

interface DataTableProps {
  marketData: ProductInfo[];
  skipPageResetRef: React.MutableRefObject<boolean | undefined>;
}

const FilteredTable = ({
  marketData,
  skipPageResetRef,
}: DataTableProps) => {
  const [tag, setTag] = useState(DefaultFilter);

  function changeTag(tag: string) {
    setTag(tag);
  }
  function dataFilter(tag: string) {
    const res =
      tag === DefaultFilter
        ? marketData
        : marketData.filter(({ tags }) => tags.includes(tag));
    return res;
  }
  const filteredData = dataFilter(tag);
  return (
    <>
      <TableFilter
        changeTag={changeTag}
        defaultValue={DefaultFilter}
        className="py-4"
      />
      <DataTable
        columns={columns}
        data={filteredData}
        skipPageResetRef={skipPageResetRef}
      />
    </>
  );
};

export default FilteredTable;
