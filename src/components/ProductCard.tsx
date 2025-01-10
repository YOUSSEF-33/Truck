import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency } from '../utils/currency';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  currency: 'EGP' | 'SAR';
}

export function ProductCard({ product, currency }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{product.description}</p>
          <p className="text-lg font-bold text-gray-900 mt-2">
            {formatCurrency(product.price[currency.toLowerCase()], currency)}
          </p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          className="w-full bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}