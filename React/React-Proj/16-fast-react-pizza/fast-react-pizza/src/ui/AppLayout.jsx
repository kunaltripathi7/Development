// defines the structure of the page -> App layout
import Header from './Header';
import CartOverview from '../features/cart/CartOverview';
import { Outlet, useNavigation } from 'react-router-dom';
import Loader from './Loader';

function AppLayout() {
  const navigation = useNavigation(); // gives state for all pages -> so a generic loader if state is loading.
  const isLoading = navigation.state === 'loading';

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      {/* cuz main ele was not getting its width cuz it was a grid element -> so enclose in div */}
      <div className="overflow-scroll">
        {/* for making only the main content scroll */}
        <main className="mx-auto max-w-3xl">
          {/* used to render whatever is current nested route */}
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
