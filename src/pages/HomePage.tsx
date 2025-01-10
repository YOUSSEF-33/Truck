import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Wrench, Shield, Clock } from 'lucide-react';
import { ProductSlider } from '../components/ProductSlider';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { products } from '../data/products';

export function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1920)' }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">Professional Truck Preparation Center</h1>
            <p className="text-xl mb-8">Transform your truck with our expert services and premium products</p>
            <Link to="/products" className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors">
              Explore Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: 'Expert Service', desc: 'Professional truck preparation' },
              { icon: Wrench, title: 'Quality Parts', desc: 'Premium components only' },
              { icon: Shield, title: 'Warranty', desc: 'Guaranteed satisfaction' },
              { icon: Clock, title: 'Fast Service', desc: 'Quick turnaround time' }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-red-600" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <ProductSlider products={products} currency="EGP" />
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}