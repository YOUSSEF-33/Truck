import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../context/LanguageContext';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const { items } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo Image */}
            <img
              src="/assets/logo2.png"
              alt="Logo"
              className="w-24 h-24 object-contain" // Adjust width and height here
            />
            {/* Navbar Title */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                {/* Add your title here if needed */}
              </h1>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/" className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              {t.common.home}
            </Link>
            <Link to="/products" className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              {t.common.products}
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/cart" className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white relative">
                  <ShoppingCart className="w-6 h-6" />
                  {items.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {items.length}
                    </span>
                  )}
                </Link>
                <button
                  onClick={logout}
                  className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  {t.common.logout}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  {t.common.login}
                </Link>
                <Link to="/signup" className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  {t.common.signup}
                </Link>
              </>
            )}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-2">
            {isAuthenticated && (
              <Link to="/cart" className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white relative">
                <ShoppingCart className="w-6 h-6" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {items.length}
                  </span>
                )}
              </Link>
            )}
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-2">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.common.home}
            </Link>
            <Link
              to="/products"
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.common.products}
            </Link>
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-right px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                {t.common.logout}
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.common.login}
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.common.signup}
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}