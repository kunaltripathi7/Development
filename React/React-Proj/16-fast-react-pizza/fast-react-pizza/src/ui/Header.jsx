import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/UserName';
function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      {/* breakpoints ->  those classes will apply when it will be greater than the breakpoint Otherwise the default one will be applied || mobile first design
      need to have unprefix version to apply media query styles*/}
      <Link to="/" className="tracking-widest">
        Fast Pizza React Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
