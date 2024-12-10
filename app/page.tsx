import NavBar from './components/NavBar';
import MarketHeader from './components/MarketGroup';
import MarketTable from './components/MarketTable';
import TableFilter from './components/TableFilter';

export default function Home() {
  return (
    // <div>
    //   <h2>Market Overview</h2>
    //   <ProductTable />
    // </div>
    <div className="mx-auto max-w-7xl">
      <NavBar />
      <MarketHeader className="mt-4 px-3" />
      <MarketTable />
    </div>
  );
}
