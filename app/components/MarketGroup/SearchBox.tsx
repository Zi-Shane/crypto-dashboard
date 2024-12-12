import { Input } from '@/components/ui/input';

interface SearchBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox = ({ value, onChange, ...Props }: SearchBoxProps) => {
  return (
    <Input
      className="w-30"
      placeholder="Search Coin Name"
      value={value ?? ''}
      onChange={e => onChange(e)}
      {...Props}
    />
  );
};

export default SearchBox;
