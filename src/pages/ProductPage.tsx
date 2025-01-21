import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Currency, Product } from '../types';
import { formatCurrency } from '../utils/currency';
import axiosInstance from '../utils/axiosInstance';

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [currency, setCurrency] = useState<Currency>('EGP');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the product from the API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/v1/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product. Please try again later.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Display loading state
  if (loading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  // Display error state
  if (error) {
    return <div className="text-center py-16 text-red-600">{error}</div>;
  }

  // Handle case where product is not found
  if (!product) {
    return <div className="text-center py-16">Product not found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 mb-8 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
      >
        <ChevronLeft className="w-5 h-5 mr-1" /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="relative">
          <img
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-lg"
          />
          {product.images.length > 1 && (
            <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
              <button
                onClick={() =>
                  setCurrentImageIndex((i) =>
                    i > 0 ? i - 1 : product.images.length - 1
                  )
                }
                className="bg-white/80 p-2 rounded-full shadow-md dark:bg-gray-700"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() =>
                  setCurrentImageIndex((i) =>
                    i < product.images.length - 1 ? i + 1 : 0
                  )
                }
                className="bg-white/80 p-2 rounded-full shadow-md dark:bg-gray-700"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4 dark:text-white">{product.name}</h1>
          <p className="text-gray-600 mb-6 dark:text-gray-400">{product.description}</p>

          {/* Price and Currency Selector */}
          <div className="flex items-center gap-4 mb-6">
            <p className="text-2xl font-bold dark:text-white">
              {formatCurrency(product.price[currency], currency)}
            </p>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="border rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            >
              <option value="EGP">EGP</option>
              <option value="SAR">SAR</option>
            </select>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 dark:bg-red-700 dark:hover:bg-red-600"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
