import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { ProductSearch } from '../components/ProductSearch';
import { ProductFilters } from '../components/ProductFilters';
import { Footer } from '../components/Footer';
import { products } from '../data/products';
import { Currency } from '../types';

export function ProductsPage() {
  const [currency, setCurrency] = useState<Currency>('EGP');
  const [category, setCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filteredProducts = products
    .filter(p => category === 'all' || p.category === category)
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(p => {
      const price = p.price[currency.toLowerCase()];
      return price >= priceRange[0] && price <= priceRange[1];
    });

  return (
    <div>
      <div className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Our Products</h1>
          
          {/* Search and Currency */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <ProductSearch onSearch={setSearchQuery} />
            </div>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="border rounded-lg px-4 py-2"
            >
              <option value="EGP">EGP</option>
              <option value="SAR">SAR</option>
            </select>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden w-full bg-white px-4 py-2 rounded-lg shadow-sm mb-4 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </span>
            {isFilterOpen ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters */}
            <div className={`lg:col-span-1 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <ProductFilters
                  categories={categories}
                  selectedCategory={category}
                  onCategoryChange={setCategory}
                  priceRange={priceRange}
                  onPriceRangeChange={setPriceRange}
                />
              </div>
            </div>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} currency={currency} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}