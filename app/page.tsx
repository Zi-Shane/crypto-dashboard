import NavBar from './components/NavBar';
import MarketHeader from './components/MarketGroup';
import MarketTable from './components/MarketTable';
import { getProductsInfo } from './API/formatData';

export default async function Home() {
  const products = await getProductsInfo();

  return (
    <div className="mx-auto max-w-7xl">
      <NavBar />
      <MarketHeader className="mt-4 px-3" />
      <MarketTable data={products} />
    </div>
  );
}
