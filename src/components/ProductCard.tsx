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

  // حساب السعر المخفض إذا كان ذلك ينطبق
  const currentDate = new Date();
  const discountStartDate = new Date(product.discountStartDate);
  const discountEndDate = new Date(product.discountEndDate);
  const isDiscountActive =
    product.discount > 0 &&
    currentDate >= discountStartDate &&
    currentDate <= discountEndDate;

  const originalPrice = parseFloat(product.price[currency]);
  const discountedPrice = isDiscountActive
    ? originalPrice * (1 - product.discount / 100)
    : originalPrice;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {product.description}
          </p>

          {/* عرض السعر الأصلي والسعر المخفض */}
          <div className="mt-2">
            {isDiscountActive && (
              <p className="text-sm text-gray-500 dark:text-gray-400 line-through">
                {formatCurrency(originalPrice, currency)}
              </p>
            )}
            <p className="text-lg font-bold text-gray-900 dark:text-gray-200">
              {formatCurrency(discountedPrice, currency)}
              {isDiscountActive && (
                <span className="ml-2 text-sm text-red-600 dark:text-red-400">
                  ({product.discount}% خصم)
                </span>
              )}
            </p>
          </div>

          {/* عرض حالة المخزون */}
          <p
            className={`text-sm mt-1 ${
              product.isStock
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {product.isStock ? 'متوفر في المخزون' : 'غير متوفر في المخزون'}
          </p>
        </div>
      </Link>

      {/* زر إضافة إلى السلة */}
      <div className="px-4 pb-4">
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          disabled={!product.isStock} // تعطيل الزر إذا كان المنتج غير متوفر
          className={`w-full ${
            product.isStock
              ? 'bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800'
              : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
          } text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2`}
        >
          <ShoppingCart className="w-5 h-5" />
          {product.isStock ? 'أضف إلى السلة' : 'غير متوفر'}
        </button>
      </div>
    </div>
  );
}
