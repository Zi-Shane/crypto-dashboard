import { cn } from '@/lib/utils';
import MarketTitle from './MarketGroup/MarketTitle';
import SearchBox from './MarketGroup/SearchBox';

interface MarketGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const MarketGroup = ({ className, ...props }: MarketGroupProps) => {
  return (
    <div className={cn('flex justify-between', className)}>
      <MarketTitle />
      {/* <SearchBox /> */}
    </div>
  );
};

export default MarketGroup;
