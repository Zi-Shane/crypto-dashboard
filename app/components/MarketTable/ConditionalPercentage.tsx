import { formatPercentage } from '@/lib/formater';
import { cn } from '@/lib/utils';

interface ConditionalPercentageProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  value: number;
  mobileClassName?: string;
  desktopClassName?: string;
}

const ConditionalPercentage = ({
  value,
  mobileClassName,
  desktopClassName,
}: ConditionalPercentageProps) => {
  return (
    <>
      <div
        className={cn(
          'mx-auto w-[100px] rounded-lg py-2 text-tablecell-RedGreenBgText md:hidden',
          value > 0 ? 'bg-tablecell-buy' : 'bg-tablecell-sell',
          mobileClassName,
        )}
      >
        {formatPercentage(value)}%
      </div>
      <div
        className={cn(
          'hidden font-bold text-inherit md:block',
          value > 0 ? 'text-tablecell-buy' : 'text-tablecell-sell',
          desktopClassName,
        )}
      >
        {formatPercentage(value)}%
      </div>
    </>
  );
};

export default ConditionalPercentage;
