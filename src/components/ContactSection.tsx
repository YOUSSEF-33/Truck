import React from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export function ContactSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800" id="contact">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">تواصل معنا</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">ابقَ على اتصال</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-red-600 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">الهاتف</h4>
                  <p className="text-gray-600 dark:text-gray-300">+20 123 456 789</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-red-600 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">البريد الإلكتروني</h4>
                  <p className="text-gray-600 dark:text-gray-300">info@truckprep.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-red-600 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">الموقع</h4>
                  <p className="text-gray-600 dark:text-gray-300">القاهرة، مصر</p>
                </div>
              </div>
            </div>
          </div>
          
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">الاسم</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">البريد الإلكتروني</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">الرسالة</label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 dark:bg-red-500 dark:hover:bg-red-600"
            >
              <Send className="w-5 h-5" />
              إرسال الرسالة
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
