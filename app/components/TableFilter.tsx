import { FiltersL1 } from '@/data/filters';

import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';

interface TableFilterProps extends React.HTMLAttributes<HTMLDivElement> {}

const TableFilter = ({ className, ...props }: TableFilterProps) => {
  return (
    <div
      className={cn(
        'scroller-bar no-scrollbar flex gap-2 overflow-auto',
        className,
      )}
      {...props}
    >
      <ToggleGroup type="single" defaultValue={FiltersL1[0]}>
        {FiltersL1.map(filter => (
          <ToggleGroupItem
            className="h-fit whitespace-nowrap"
            key={`filter-${filter}`}
            value={filter}
            aria-label="Toggle"
          >
            {filter}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default TableFilter;
