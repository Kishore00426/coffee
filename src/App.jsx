import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from "./components/Header";
import Footer from "./components/Footer";
import GoToTop from "./components/GoToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          <Footer />
          <GoToTop />
        </div>
        <Toaster
          toastOptions={{
            style: {
              background: 'black',
              backdropFilter: 'blur(20px)',
              color: '#fff',
            },
          }}
        />
      </WishlistProvider>
    </CartProvider>
  );
}
