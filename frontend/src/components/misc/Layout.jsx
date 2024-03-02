import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { FooterSocial } from "./FooterSocial";
import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();
const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <FooterSocial />
    </div>
  );
};

export default Layout;
