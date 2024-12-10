import { ModeToggle } from './NavBar/ModeToggle';

const NavBar = () => {
  return (
    <div className="flex w-full justify-between">
      <h1 className="text-2xl font-bold">Crypto Dashboard</h1>
      <ModeToggle />
    </div>
  );
};

export default NavBar;
