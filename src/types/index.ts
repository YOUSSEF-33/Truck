export interface Product {
  id: number;
  name: string;
  description: string;
  price: {
    EGP: string;
    SAR: string;
  };
  images: string[];
  categoryId: number;
  category:{
    name: string;
  }
  quantity: number;
  isStock: boolean;
  discount: number;
  discountStartDate: string; // ISO date string
  discountEndDate: string; // ISO date string
  updatedAt: string; // ISO date string
  createdAt: string; // ISO date string

}

export type Currency = 'EGP' | 'SAR';

export interface CartItem extends Product {
  quantity: number;
}