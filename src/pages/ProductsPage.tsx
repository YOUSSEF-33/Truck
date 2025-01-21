import React, { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { ProductSearch } from '../components/ProductSearch';
import { ProductFilters } from '../components/ProductFilters';
import { Footer } from '../components/Footer';
import axiosInstance from '../utils/axiosInstance';
import { Product, Currency } from '../types';

export function ProductsPage() {
  const [currency, setCurrency] = useState<Currency>('EGP');
  const [category, setCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [product, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/v1/api/products', {
          params: {
            page: 1, // Fetch the first page
            limit: 100, // Fetch a large number of products (adjust as needed)
          },
        });
        setProducts(response.data.products);
        setLoading(false);
      } catch (err) {
        setError('فشل في تحميل المنتجات. حاول مرة أخرى في وقت لاحق.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/v1/api/categories');
        setCategories(response.data);
      } catch (err) {
        console.error('فشل في تحميل الفئات:', err);
      }
    };

    fetchCategories();
  }, []);

  // Get unique category names from fetched categories
  const categoryNames = ['all', ...categories.map((c) => c.name)];

  // Filter products based on category, search query, and price range
  const filteredProducts = product
    .filter((p) => category === 'all' || p.category.name === category)
    .filter((p) => {
      return p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             p.description.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .filter((p) => {
      const price = parseFloat(p.price[currency]);
      return price >= priceRange[0] && price <= priceRange[1];
    });

  // Display loading state
  if (loading) {
    return <div className="text-center py-16">جارٍ التحميل...</div>;
  }

  // Display error state
  if (error) {
    return <div className="text-center py-16 text-red-600">{error}</div>;
  }

  return (
    <div className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">منتجاتنا</h1>

        {/* Search and Currency */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <ProductSearch onSearch={setSearchQuery} />
          </div>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="border rounded-lg px-4 py-2 bg-gray-700 text-white"
          >
            <option value="EGP">جنيه مصري</option>
            <option value="SAR">ريال سعودي</option>
          </select>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="lg:hidden w-full bg-gray-800 px-4 py-2 rounded-lg shadow-sm mb-4 flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            الفلاتر
          </span>
          {isFilterOpen ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className={`lg:col-span-1 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-gray-800 p-4 rounded-lg shadow-sm">
              <ProductFilters
                categories={categoryNames}
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
      <Footer />
    </div>
  );
}
