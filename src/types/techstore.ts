export interface Product {
  id: number;
  slug: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface SortOption {
  label: string;
  value: "newest" | "price-asc" | "price-desc" | "rating";
}
