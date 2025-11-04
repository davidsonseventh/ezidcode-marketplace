// Types untuk aplikasi ezidcode marketplace

export type UserRole = 'admin' | 'vendor' | 'buyer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  balance: number;
}

export interface Product {
  id: string;
  vendorId: string;
  vendorName: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  stock: number;
  rating: number;
  reviewCount: number;
  sold: number;
  isDigital: boolean;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  name: string;
  options: string[];
  price?: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedVariants?: { [key: string]: string };
}

export interface Order {
  id: string;
  userId: string;
  vendorId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  shippingAddress: string;
  trackingNumber?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  productId: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
}

export interface Vendor {
  id: string;
  name: string;
  logo?: string;
  description: string;
  rating: number;
  products: number;
  followers: number;
  joinDate: string;
  commission: number;
}

export interface POSItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  buyPrice: number;
  sellPrice: number;
  stock: number;
  unit: string;
}

export interface POSTransaction {
  id: string;
  items: { item: POSItem; quantity: number }[];
  total: number;
  paid: number;
  change: number;
  paymentMethod: 'cash' | 'card' | 'ewallet';
  cashier: string;
  createdAt: string;
}

export interface PPOBProduct {
  id: string;
  category: 'pulsa' | 'data' | 'pln' | 'pdam' | 'bpjs';
  name: string;
  provider: string;
  price: number;
  description: string;
}
