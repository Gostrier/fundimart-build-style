export interface Seller {
  id: string;
  userId: string;
  hardwareName: string;
  location: string;
  firmEmail: string;
  createdAt: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: "buyer" | "seller";
  seller?: Seller;
  createdAt: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  quality?: string;
  description?: string;
  photos: string[];
  sellerId: string;
  sellerName: string;
  status: string;
  createdAt: number;
  updatedAt: number;
}
