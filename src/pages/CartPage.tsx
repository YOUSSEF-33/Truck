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
    (sum:any, item:any) => sum + item.price[currency] * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center dark:text-white">
          <h2 className="text-2xl font-bold mb-4">سلة التسوق فارغة</h2>
          <Link
            to="/products"
            className="text-red-600 hover:text-red-700 font-semibold"
          >
            استمر بالتسوق
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8 dark:text-white">
        <h1 className="text-3xl font-bold mb-8">
          {paymentStep === 'cart' ? 'سلة التسوق' : 'الدفع'}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {paymentStep === 'cart' ? (
              items.map((item:any) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b py-4 last:border-b-0 dark:border-gray-700"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600 text-sm dark:text-gray-400">{item.description}</p>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
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
                        item.price[currency] * item.quantity,
                        currency
                      )}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <form className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">معلومات الشحن</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                        الاسم الأول
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                        الاسم الأخير
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:border-gray-600"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                        العنوان
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:border-gray-600"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">معلومات الدفع</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                        رقم البطاقة
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:border-gray-600"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                          تاريخ الانتهاء
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:border-gray-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                          CVC
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:border-gray-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg h-fit">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">ملخص الطلب</h3>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="border rounded-lg px-4 py-2 dark:bg-gray-800 dark:border-gray-600"
              >
                <option value="EGP">جنيه مصري</option>
                <option value="SAR">ريال سعودي</option>
              </select>
            </div>
            
            <div className="border-t pt-4 dark:border-gray-700">
              <div className="flex justify-between mb-2">
                <span>الإجمالي الفرعي</span>
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
                    <CreditCard className="w-5 h-5 " />
                    متابعة الدفع
                  </>
                ) : (
                  'إكمال الطلب'
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
