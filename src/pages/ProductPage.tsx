import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Currency } from '../types';
import { formatCurrency } from '../utils/currency';

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [currency, setCurrency] = useState<Currency>('EGP');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = products.find(p => p.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 mb-8"
      >
        <ChevronLeft className="w-5 h-5 mr-1" /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <img
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="w-full rounded-lg"
          />
          {product.images.length > 1 && (
            <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
              <button
                onClick={() => setCurrentImageIndex(i => (i > 0 ? i - 1 : product.images.length - 1))}
                className="bg-white/80 p-2 rounded-full shadow-md"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => setCurrentImageIndex(i => (i < product.images.length - 1 ? i + 1 : 0))}
                className="bg-white/80 p-2 rounded-full shadow-md"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          <div className="flex items-center gap-4 mb-6">
            <p className="text-2xl font-bold">
              {formatCurrency(product.price[currency.toLowerCase()], currency)}
            </p>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="border rounded-lg px-4 py-2"
            >
              <option value="EGP">EGP</option>
              <option value="SAR">SAR</option>
            </select>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="w-full bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}