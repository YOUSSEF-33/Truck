import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Wrench, Shield, Clock } from 'lucide-react';
import { ProductSlider } from '../components/ProductSlider';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import axiosInstance from '../utils/axiosInstance';
import { Product } from '../types';

export function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]); // State to store featured products
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to handle error messages

  // Fetch featured products on component mount
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axiosInstance.get('/v1/api/products?page=1&limit=4'); // Fetch featured products with pagination
        console.log(response); // Log the response for debugging
        setFeaturedProducts(response.data.products); // Update state with fetched products
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError('فشل في جلب المنتجات المميزة. الرجاء المحاولة لاحقًا.'); // Set error message if the request fails
        setLoading(false); // Set loading to false on error
      }
    };

    fetchFeaturedProducts(); // Invoke the fetch function
  }, []);

  // Display loading state
  if (loading) {
    return <div className="text-center py-16">جارٍ التحميل...</div>; // Show loading message while fetching data
  }

  // Display error state
  if (error) {
    return <div className="text-center py-16 text-red-600 dark:text-red-400">{error}</div>; // Show error message if fetching fails
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-cover bg-center" style={{ backgroundImage: 'url(/assets/mercedes.jpg)' }}>
        <div className="absolute inset-0 bg-black/50" /> {/* Dark overlay */}
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-4">مركز أبو الدهب CVC لصيانة الشاحنات التجارية.</h1>
            <p className="text-xl mb-8">نقدم خدمات متكاملة بأعلي جودة, مع توفير قطع غيار اصلية وجديدة لتلبية احتياجاتك</p>
            <Link to="/products" className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors">
              استكشاف المنتجات
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">لماذا تختارنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: 'خدمة احترافية', desc: 'تجهيز احترافي للشاحنات' },
              { icon: Wrench, title: 'قطع غيار ذات جودة', desc: 'مكونات متميزة فقط' },
              { icon: Shield, title: 'ضمان', desc: 'ضمان رضا العملاء' },
              { icon: Clock, title: 'خدمة سريعة', desc: 'وقت تنفيذ سريع' }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-red-600 dark:text-red-400" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">المنتجات المميزة</h2>
          <ProductSlider products={featuredProducts} currency="EGP" />
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
