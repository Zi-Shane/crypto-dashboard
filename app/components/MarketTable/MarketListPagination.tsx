import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

interface MarketListPaginationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  goPrevPage: () => void;
  goNextPage: () => void;
  hasPrevPg: boolean;
  hasNextPg: boolean;
  currPg: number;
  lastPg: number;
  goPage: (n: number) => void;
}

const MarketListPagination = ({
  goPrevPage,
  goNextPage,
  hasPrevPg,
  hasNextPg,
  currPg,
  lastPg,
  goPage,
  ...props
}: MarketListPaginationProps) => {
  const wSize = 5;

  // 12345...9, c<4
  // 123456...9, c=4
  // 1...34567...9, c=5
  // 1...456789, c=6
  // 1...56789, c>6
  const calSlide = (
    cur: number,
    last: number,
    wSize: number,
  ): number[] => {
    const s = 1 + Math.floor(wSize / 2),
      e = last - Math.floor(wSize / 2) - 1;
    const w = [...Array(5).keys()].map(k => k + 1);
    const dot = -1;
    if (last <= wSize + 1) {
      return [...Array(last).keys()].map(k => k + 1);
    }

    if (cur <= s) {
      return [...w, dot, last];
    } else if (cur > s && cur <= e) {
      let ret = [...w].map(v => v + cur - s);
      const hasPreDot = cur - s === 1 ? false : true;
      const hasNextDot = last - ret[ret.length - 1] === 1 ? false : true; //
      if (hasPreDot && hasNextDot) {
        return [1, dot, ...ret, dot, last];
      } else if (hasPreDot) {
        return [1, dot, ...ret, last];
      } else {
        return [1, ...ret, dot, last];
      }
    } else {
      let ret = [...w].map(v => v + last - wSize);
      return [1, dot, ...ret];
    }
  };

  const paginationItems = calSlide(currPg, lastPg, wSize);

  return (
    <Pagination {...props}>
      <PaginationContent>
        <PaginationItem onClick={goPrevPage}>
          <PaginationPrevious
            className={cn(
              !hasPrevPg ? 'pointer-events-none opacity-50' : '',
            )}
          />
        </PaginationItem>
        {paginationItems.map((v, k) => {
          if (v === -1) {
            return (
              <PaginationItem key={`page-dot-${k}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
          return (
            <PaginationItem
              key={`page-${k}`}
              onClick={() => goPage(v - 1)}
            >
              <PaginationLink isActive={currPg === v}>
                {v.toString()}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem onClick={goNextPage}>
          <PaginationNext
            className={cn(
              !hasNextPg ? 'pointer-events-none opacity-50' : '',
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default MarketListPagination;
