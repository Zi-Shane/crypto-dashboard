import { cn } from '@/lib/utils';
import MarketTitle from './MarketGroup/MarketTitle';

interface MarketGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const MarketGroup = ({ className, ...props }: MarketGroupProps) => {
  return (
    <div className={cn('flex justify-between', className)}>
      <MarketTitle />
    </div>
  );
};

export default MarketGroup;
