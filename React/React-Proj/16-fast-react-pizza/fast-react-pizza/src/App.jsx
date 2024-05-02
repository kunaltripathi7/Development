import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './ui/Home';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder';
import Order, { loader as orderLoader } from './features/order/Order';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';
import { action as updateOrderAction } from './features/order/UpdateOrder';

const router = createBrowserRouter([
  // returns a router obj
  // enables apis - loaders -> readers, actions-> writers, fetchers
  // imperative way decalaring routes -> needed to do data fetching operations
  {
    element: <AppLayout />, //layout route -A parent route without a path, used exclusively for grouping child routes inside a specific layout.  || this is how to insert other elements inside applayout.
    errorElement: <Error />, // every error bubbles up to the parent element
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />, // to view it inside the layout.
        // loaders -> create a loader func. in compo -> set the loader prprty in route -> use the loader data in compo via useLoaderData hook
      },
      {
        path: 'order/new', // whenever there will be a form submission on this route the action will be performed
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: 'order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />; // router objs are passed to render app & enable rest of data apis.
}

export default App;

// ui -> contains reusable compos -> presentational don't contain any side effects
// services -> reusable code for interacting with api
// utils -> reusable helper func's (stateless helper func's that do not create any side effects)
