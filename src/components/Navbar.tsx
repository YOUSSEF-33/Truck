import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Navbar() {
  const { items } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-800">TruckPrep</h1>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <Link to="/" className="px-3 py-2 text-gray-700 hover:text-gray-900">Home</Link>
            <Link to="/products" className="px-3 py-2 text-gray-700 hover:text-gray-900">Products</Link>
            <Link to="/cart" className="px-3 py-2 text-gray-700 hover:text-gray-900 relative">
              <ShoppingCart className="w-6 h-6" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {items.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Link to="/cart" className="px-3 py-2 text-gray-700 hover:text-gray-900 relative mr-2">
              <ShoppingCart className="w-6 h-6" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {items.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-2">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:text-gray-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block px-3 py-2 text-gray-700 hover:text-gray-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}