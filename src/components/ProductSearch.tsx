import React from 'react';
import { Search } from 'lucide-react';

interface ProductSearchProps {
  onSearch: (query: string) => void;
}

export function ProductSearch({ onSearch }: ProductSearchProps) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
      />
      <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
    </div>
  );
}