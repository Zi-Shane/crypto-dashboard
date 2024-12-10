import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import ConditionalPercentage from './ConditionalPercentage';
import HeaderWithSort from './HeaderWithSort';
import { ProductInfo } from '@/data/type';
import useColumnSort from '@/hooks/useColumnSort';
import { COLUMNS } from '@/data/table';

interface MarketListProps {
  products: ProductInfo[];
}

export function MarketList({ products }: MarketListProps) {
  const { sortColumn, sortStatus, handleSort } = useColumnSort();

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-inherit">
          <TableHead className="w-[100px]">
            <HeaderWithSort
              name={COLUMNS.SYMBOL}
              sortStatus={sortColumn === COLUMNS.SYMBOL ? sortStatus : ''}
              onSort={() => handleSort(COLUMNS.SYMBOL)}
            />
          </TableHead>
          <TableHead className="text-right">
            <HeaderWithSort
              name={COLUMNS.LAST_PRICE}
              sortStatus={
                sortColumn === COLUMNS.LAST_PRICE ? sortStatus : ''
              }
              onSort={() => handleSort(COLUMNS.LAST_PRICE)}
            />
          </TableHead>
          <TableHead className="w-[130px] text-center md:w-auto md:text-right">
            <HeaderWithSort
              name={COLUMNS.PERCENTAGE}
              sortStatus={
                sortColumn === COLUMNS.PERCENTAGE ? sortStatus : ''
              }
              onSort={() => handleSort(COLUMNS.PERCENTAGE)}
            />
          </TableHead>
          <TableHead className="hidden text-right md:table-cell">
            <HeaderWithSort
              name={COLUMNS.VOLUMN}
              sortStatus={
                sortColumn === COLUMNS.VOLUMN ? sortStatus : false
              }
              onSort={() => handleSort(COLUMNS.VOLUMN)}
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map(product => (
          <TableRow key={product.base}>
            <TableCell className="w-[100px] font-medium">
              {product.base}
            </TableCell>
            <TableCell className="text-right">{product.current}</TableCell>
            <TableCell className="w-[130px] text-center md:w-auto md:text-right">
              <ConditionalPercentage value={product.percentage} />
            </TableCell>
            <TableCell className="hidden text-right md:table-cell">
              {product.volumn}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
