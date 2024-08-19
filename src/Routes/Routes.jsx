import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import UpdateProfile from "../components/UpdateProfile/UpdateProfile";
import CategoryDetails from "../pages/Home/Category/CategoryDetails";
import Carts from "../pages/Carts/Carts";
import ShopPage from "../pages/ShopPage/ShopPage";
import Payment from "../pages/CheckoutForm/Payment";
import InvoicePage from "../components/Invoice/InvoicePage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
        {
            index: true,
            element: <Home />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/upateProfile",
          element: <UpdateProfile />
        },
        {
          path: "/categoryDetails/:categoryName",
          element: <CategoryDetails />
        },
        {
          path: "/carts",
          element: <Carts />
        },
        {
          path: "/shopPage",
          element: <ShopPage />
        },
        {
          path: "/payment",
          element: <Payment />
        },
        {
          path: "/invoice",
          element: <InvoicePage />
        },
    ]
  },
]);
