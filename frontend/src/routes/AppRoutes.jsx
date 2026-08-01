import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Books from "../pages/Books";
import BookDetails from "../pages/BookDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import PaymentSuccess from "../pages/PaymentSuccess";
import Dashboard from "../pages/Dashboard";
import MyLibrary from "../pages/MyLibrary";
import Profile from "../pages/profile";
import Preview from "../pages/Preview";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminRoute from "../components/AdminRoute";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Help from "../pages/Help";
import Feedback from "../pages/Feedback";
import FAQ from "../pages/FAQ";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";
import Cookies from "../pages/Cookies";
import NotFound from "../pages/NotFound";
import HelpCenter from "../components/HelpCenter";
import ScrollToTop from "../components/ScrollToTop";
import CookieBanner from "../components/CookieBanner";
export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help" element={<Help />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/preview/:id" element={<Preview />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/helpcenter" element={<HelpCenter />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <PaymentSuccess />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/mylibrary"
          element={
            <ProtectedRoute>
              <MyLibrary />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CookieBanner />
    </>
  );
}