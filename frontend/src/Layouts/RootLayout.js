import { Outlet } from "react-router-dom";
import Navigation from "../Components/Navigation";
import Footer from "../Components/Footer";
import Breadcrumbs from "../Utilities/Breadcrumbs";
import ProductModal from "../Components/ProductModal";
import Basket from "../Components/Basket";
import { useAuth } from "../Context/AuthContext";
import { useEffect } from "react";
import axios from "axios";

export default function RootLayout() {
  const { setUserCb, login, fetchUserTrigger } = useAuth();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8800");
        if (res.data.isSessionValid) {
          const userData = res.data.user;
          setUserCb(userData);
          login();
          console.log("UseEffect on Home");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [setUserCb, login, fetchUserTrigger]);

  return (
    <>
      <Navigation />

      <main className="container-fluid main transition-default">
        <Breadcrumbs />
        <div className="mw-1440">
          <Outlet />
        </div>
      </main>
      <Footer />
      <ProductModal />
      <Basket />
    </>
  );
}
