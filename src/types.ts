export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  coverImage: string;
  category: string;
  rating: number;
  reviewCount: number;
  productCount: number;
  verified: boolean;
  description: string;
  established: string;
  location: string;
  website: string;
  socials: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
  featuredCollections: string[];
  trending: boolean;
}

export interface Product {
  id: string;
  name: string;
  brandId: string;
  brandName: string;
  brandLogo: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  category: string;
  image: string;
  images: string[];
  inStock: boolean;
  stockQuantity: number;
  description: string;
  specifications: Record<string, string>;
  colors: string[];
  sizes?: string[];
  isNew?: boolean;
  isTrending?: boolean;
  isFlashSale?: boolean;
  warranty: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  image: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulVotes: number;
  productName: string;
}
