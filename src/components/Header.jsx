import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import logo from "../assets/logo.jpg";
import '../App.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const location = useLocation();

  return (
    <header className="w-full backdrop-blur-2xl bg-invert sticky top-0 z-10 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Coffee Logo"
            className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-full"
          />
          <h1 className="text-xl md:text-2xl font-bold">Proproducts</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <Link to="/" className={`menu-link ${location.pathname === '/' ? 'text-yellow-400 active-link' : ''}`}>Home</Link>
          <Link to="/about" className={`menu-link ${location.pathname === '/about' ? 'text-yellow-400 active-link' : ''}`}>About</Link>
          <Link to="/products" className={`menu-link ${location.pathname === '/products' ? 'text-yellow-400 active-link' : ''}`}>Products</Link>
          <Link to="/contact" className={`menu-link ${location.pathname === '/contact' ? 'text-yellow-400 active-link' : ''}`}>Contact</Link>
          <Link to="/orders" className={`menu-link ${location.pathname === '/orders' ? 'text-yellow-400 active-link' : ''}`}>Orders</Link>
          <Link to="/profile" className={`menu-link ${location.pathname === '/profile' ? 'text-yellow-400 active-link' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </Link>
          <Link to="/cart" className={`menu-link relative ${location.pathname === '/cart' ? 'text-yellow-400 active-link' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center  space-x-2">
          {/* Mobile Cart Icon */}
          <Link to="/cart" className="menu-link relative p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none p-2"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-brown-700 px-4 pb-4">
          <nav className="flex flex-col space-y-4 text-center">
            <Link to="/" className={`menu-link duration-200 ${location.pathname === '/' ? 'text-yellow-400' : ''}`} onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/about" className={`menu-link ${location.pathname === '/about' ? 'text-yellow-400' : ''}`} onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/products" className={`menu-link ${location.pathname === '/products' ? 'text-yellow-400' : ''}`} onClick={() => setIsOpen(false)}>Products</Link>
            <Link to="/contact" className={`menu-link ${location.pathname === '/contact' ? 'text-yellow-400' : ''}`} onClick={() => setIsOpen(false)}>Contact</Link>
            <Link to="/orders" className={`menu-link ${location.pathname === '/orders' ? 'text-yellow-400' : ''}`} onClick={() => setIsOpen(false)}>Orders</Link>
            <Link to="/profile" className={`menu-link ${location.pathname === '/profile' ? 'text-yellow-400' : ''}`} onClick={() => setIsOpen(false)}>Profile</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
