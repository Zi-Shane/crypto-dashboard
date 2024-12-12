import { DefaultFilter } from '@/data/filters';
import { ProductInfo } from '@/data/type';

const useTagFilter = (
  marketData: ProductInfo[],
  updater: (data: ProductInfo[]) => void,
) => {
  function filterData(tag: string) {
    const res =
      tag === DefaultFilter
        ? marketData
        : marketData.filter(({ tags }) => tags.includes(tag));
    updater(res);
  }
  return { filterData };
};

export default useTagFilter;
