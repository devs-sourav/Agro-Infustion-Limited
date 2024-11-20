import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import RootLayout from "./components/layout/RootLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Blogs from "./pages/Blogs";
import EventPage from "./pages/EventPage";
import SuccessStories from "./pages/SuccessStories";

import Contact from "./pages/Contact";

import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Shop from "./pages/Shop";

import SingleStoryPage from "./pages/SingleStoryPage";
import SingleBlogPage from "./pages/SingleBlogPage";
import SingleEventPage from "./pages/SingleEventPage";

import CartDetails from "./pages/CartDetails";

import SingleShopPage from "./pages/SingleShopPage";
import UserProfile from "./pages/UserProfile";

import CheckOut from "./pages/CheckOut";
import OrderConfirmation from "./pages/OrderConfirmation";
import Thankyou from "./pages/Thankyou";
import ForgotPassword from "./pages/ForgotPassword";

import VerifyEmail from "./pages/VerifyEmail";
import ProductGridShopPage from "./components/shop/ProductGridShopPage";
import CategoryShop from "./components/shop/CategoryShop";
import ResetPassword from "./pages/ResetPassword";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />

      <Route path="/blogs" element={<Blogs />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/blogs/:slug" element={<SingleBlogPage />} />
      <Route path="/contact-us" element={<Contact />} />
      <Route path="/shoping-cart" element={<CartDetails />} />
      <Route path="/checkout" element={<CheckOut />} />
      <Route path="/order-confirm" element={<OrderConfirmation />} />
      <Route path="/thank-you" element={<Thankyou />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/events" element={<EventPage />} />
      <Route path="/events/:id" element={<SingleEventPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password/:token" element={<ResetPassword/>} />
      <Route path="/shop" element={<Shop />}>
        <Route index element={<ProductGridShopPage />} />
        <Route path="category/:slug" element={<CategoryShop />} />
      </Route>
      <Route path="/verify" element={<VerifyEmail />} />
      <Route path="/shop/:slug" element={<SingleShopPage />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/success-stories" element={<SuccessStories />} />
      <Route path="/success-stories/:id" element={<SingleStoryPage />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <>
      {/* <ToastContainer /> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
