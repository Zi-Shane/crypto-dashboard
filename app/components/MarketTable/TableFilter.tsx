import { FiltersL1 } from '@/data/filters';

import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';

interface TableFilterProps extends React.HTMLAttributes<HTMLDivElement> {
  changeTag: (tag: string) => void;
  defaultValue: string;
}

const TableFilter = ({
  changeTag,
  defaultValue,
  className,
  ...props
}: TableFilterProps) => {
  return (
    <div
      className={cn(
        'scroller-bar no-scrollbar flex gap-2 overflow-auto',
        className,
      )}
      {...props}
    >
      <ToggleGroup type="single" defaultValue={defaultValue}>
        {FiltersL1.map(({ tag, value }) => (
          <ToggleGroupItem
            className="h-fit whitespace-nowrap"
            key={`filter-${tag}`}
            value={value}
            aria-label="Toggle"
            onClick={() => changeTag(tag)}
          >
            {value}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default TableFilter;
