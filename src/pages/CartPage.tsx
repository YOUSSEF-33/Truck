import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Currency } from '../types';
import { formatCurrency } from '../utils/currency';
import { Footer } from '../components/Footer';

export function CartPage() {
  const { items, removeFromCart, updateQuantity } = useCart();
  const [currency, setCurrency] = useState<Currency>('EGP');
  const [paymentStep, setPaymentStep] = useState<'cart' | 'checkout'>('cart');

  const total = items.reduce(
    (sum, item) => sum + item.price[currency.toLowerCase()] * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Link
            to="/products"
            className="text-red-600 hover:text-red-700 font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          {paymentStep === 'cart' ? 'Shopping Cart' : 'Checkout'}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {paymentStep === 'cart' ? (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b py-4 last:border-b-0"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-1 rounded hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {formatCurrency(
                        item.price[currency.toLowerCase()] * item.quantity,
                        currency
                      )}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <form className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVC
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg h-fit">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Order Summary</h3>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="border rounded-lg px-4 py-2"
              >
                <option value="EGP">EGP</option>
                <option value="SAR">SAR</option>
              </select>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span className="font-semibold">
                  {formatCurrency(total, currency)}
                </span>
              </div>
              <button
                onClick={() => setPaymentStep(paymentStep === 'cart' ? 'checkout' : 'cart')}
                className="w-full bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                {paymentStep === 'cart' ? (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Proceed to Checkout
                  </>
                ) : (
                  'Complete Order'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}