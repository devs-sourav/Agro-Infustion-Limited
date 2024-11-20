/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "../shared/ScrollToTop";
// import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer
// import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify

const RootLayout = () => {
  const location = useLocation();

  // Check if the current path matches specific routes
  const hideNavbarFooterRoutes = [
    "/login",
    "/registration",
    "/forgot-password",
    "/verify"
  ];

  // Check if the path starts with /reset-password
  const isResetPasswordRoute = location?.pathname.startsWith("/reset-password");

  // Check if the current path is in hideNavbarFooterRoutes or starts with /reset-password
  const showNavbarFooter = !hideNavbarFooterRoutes.includes(location?.pathname) && !isResetPasswordRoute;

  return (
    <>
      {/* <ToastContainer/> */}
      <ScrollToTop />
      {showNavbarFooter && <Navbar />}
      <Outlet />
      {showNavbarFooter && <Footer />}
    </>
  );
};

export default RootLayout;
