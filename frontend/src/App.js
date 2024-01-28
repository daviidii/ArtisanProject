import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ProductProvider } from "./Context/ProductContext";
import { AuthProvider } from "./Context/AuthContext";
import { BasketProvider } from "./Context/BasketContext";

import RootLayout from "./Layouts/RootLayout";
import ProfileLayout from "./Layouts/ProfileLayout";
import ProtectedLayout from "./Layouts/ProtectedLayout";

import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Collections from "./Pages/Collections";
import ProductsCollection from "./Pages/ProductsCollection";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Checkout from "./Pages/Checkout";
import ProfileInfo from "./Pages/ProfileInfo";
import ProfileOrders from "./Pages/ProfileOrders";
import ProfileAddressList from "./Pages/ProfileAddressList";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="collections" element={<Collections />} />
        <Route
          path="collections/:collection"
          element={<ProductsCollection />}
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<ProtectedLayout />}>
          <Route path="profile" element={<ProfileLayout />}>
            <Route path="information" element={<ProfileInfo />} />
            <Route path="orders" element={<ProfileOrders />} />
            <Route path="address" element={<ProfileAddressList />} />
          </Route>
        </Route>
      </Route>
      <Route element={<ProtectedLayout />}>
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </>
  )
);

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <BasketProvider>
          <RouterProvider router={router} />
        </BasketProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
