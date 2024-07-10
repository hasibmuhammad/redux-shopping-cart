import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/FloatingCart";
import FloatingCart from "../components/FloatingCart";

const Main = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Main;
