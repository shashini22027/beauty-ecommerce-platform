import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ShoppingBag, User, LogOut, Menu, X, Heart } from 'lucide-react';

const Navbar = () => {
  const { user, cart, logout } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white/70 backdrop-blur-md border-b border-rose-100/50 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-2xl font-bold tracking-widest bg-linear-to-r from-rose-500 via-pink-500 to-purple-600 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
                AURA
              </span>
              <span className="text-xs uppercase tracking-widest text-rose-400 font-bold bg-rose-50 px-2 py-0.5 rounded-sm">
                Beauty
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
            <Link to="/" className="hover:text-rose-500 transition-colors">Home</Link>
            <Link to="/products" className="hover:text-rose-500 transition-colors">Shop</Link>
            <Link to="/products?category=Skincare" className="hover:text-rose-500 transition-colors">Skincare</Link>
            <Link to="/products?category=Makeup" className="hover:text-rose-500 transition-colors">Makeup</Link>
            <Link to="/products?category=Haircare" className="hover:text-rose-500 transition-colors">Haircare</Link>
          </div>

          {/* Action Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/cart" className="relative text-gray-700 hover:text-rose-500 transition-colors p-1">
              <ShoppingBag size={22} strokeWidth={1.8} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xxs font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce-short">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/orders" className="text-gray-700 hover:text-rose-500 text-sm font-medium transition-colors">
                  My Orders
                </Link>
                <div className="flex items-center gap-1.5 text-gray-700 border border-rose-100 bg-rose-50/50 px-3 py-1.5 rounded-full text-xs font-semibold">
                  <User size={14} className="text-rose-500" />
                  <span className="max-w-[80px] truncate">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-rose-500 transition-colors p-1"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-linear-to-r from-rose-500 to-rose-600 text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:opacity-95 transition-all transform hover:-translate-y-0.5"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Link to="/cart" className="relative text-gray-700 mr-4 p-1">
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xxs font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-rose-500 p-1"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-rose-50 px-4 pt-2 pb-4 space-y-2 animate-fadeIn duration-200">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-rose-50 hover:text-rose-500"
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-rose-50 hover:text-rose-500"
          >
            Shop
          </Link>
          <Link
            to="/products?category=Skincare"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-rose-50 hover:text-rose-500"
          >
            Skincare
          </Link>
          <Link
            to="/products?category=Makeup"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-rose-50 hover:text-rose-500"
          >
            Makeup
          </Link>
          <Link
            to="/products?category=Haircare"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-rose-50 hover:text-rose-500"
          >
            Haircare
          </Link>

          <hr className="border-rose-100/50 my-2" />

          {user ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-3 py-2 font-medium text-gray-700">
                <User size={18} className="text-rose-500" />
                <span>{user.name}</span>
              </div>
              <Link
                to="/orders"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-rose-50 hover:text-rose-500"
              >
                My Orders
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-red-500 hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-rose-500 text-white font-medium px-4 py-2.5 rounded-lg shadow-sm"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
