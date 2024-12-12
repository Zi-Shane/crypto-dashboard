import { ModeToggle } from './NavBar/ModeToggle';

const NavBar = () => {
  return (
    <div className="flex w-full justify-between px-3 py-4">
      <h1 className="text-2xl font-bold">Crypto Dashboard</h1>
      <ModeToggle />
    </div>
  );
};

export default NavBar;
