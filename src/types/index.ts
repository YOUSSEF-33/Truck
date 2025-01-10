export interface Product {
  id: string;
  name: string;
  description: string;
  price: {
    egp: number;
    sar: number;
  };
  images: string[];
  category: string;
}

export type Currency = 'EGP' | 'SAR';

export interface CartItem extends Product {
  quantity: number;
}