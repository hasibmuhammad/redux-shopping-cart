import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Products from "../components/Products";
import Cart from "../components/Cart";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Products />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);
