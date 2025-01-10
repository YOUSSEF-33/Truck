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
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
      />
      <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
    </div>
  );
}