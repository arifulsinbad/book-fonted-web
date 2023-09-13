import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import Checkout from '@/pages/AddToRead';
import Signup from '@/pages/Signup';
import ProductDetails from '@/pages/ProductDetails';
import PrivateRoute from './PrivateRoute';

import CreateBook from '@/components/CreateBook';
import UpdateBooks from '@/components/UpdateBooks';
import Whishlist from '@/components/Whishlist';
import AddToRead from '@/pages/AddToRead';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/whishlist',
        element: (
          <PrivateRoute>
            <Whishlist />
          </PrivateRoute>
        ),
      },
      {
        path: '/addToRead',
        element: (
          <PrivateRoute>
            <AddToRead />
          </PrivateRoute>
        ),
      },
      {
        path: '/createBook',
        element: <CreateBook />,
      },
      {
        path: '/product-details/:id',
        element: <ProductDetails />,
      },
      {
        path: '/updateProduct/:id',
        element: <UpdateBooks />,
      },
      {
        path: '/checkout',
        element: (
          <PrivateRoute>
            <Checkout />,
          </PrivateRoute>
        ),
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
    ],
  },

  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
