import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductSliderProps {
  products: Product[];
  currency: 'EGP' | 'SAR';
}

export function ProductSlider({ products, currency }: ProductSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-hidden scroll-smooth py-4"
      >
        {products.map((product) => (
          <div key={product.id} className="flex-none w-72">
            <ProductCard product={product} currency={currency} />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}