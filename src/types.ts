export type Size = 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL';

export type FitType = 'Slim' | 'Regular' | 'Relaxed' | 'Oversized' | 'Tailored';

export type Material = 'Organic Cotton' | 'Merino Wool' | 'French Linen' | 'Japanese Denim' | 'Cashmere' | 'Silk Blend';

export type Category = 'Outerwear' | 'Knitwear' | 'Tops & Shirts' | 'Trousers & Denim' | 'Dresses & Skirts' | 'Activewear';

export interface ColorVariant {
  id: string;
  name: string;
  hex: string;
  image: string;
  secondaryImage?: string;
  sizes: Size[]; // Available sizes for this specific color variant
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  fit: FitType;
  material: Material;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  colors: ColorVariant[];
  careInstructions: string[];
}

export type ColorFamily = 'Neutrals' | 'Earth Tones' | 'Monochrome' | 'Pastels' | 'Vibrant';

export interface FilterState {
  sizes: Size[];
  colors: string[]; // Color names
  categories: Category[];
  fits: FitType[];
  materials: Material[];
  priceRange: [number, number];
  onlyInStock: boolean;
  onSaleOnly: boolean;
  searchQuery: string;
  matchMode: 'all' | 'any'; // Match all selected attributes or any
}

export interface CartItem {
  product: Product;
  selectedColor: ColorVariant;
  selectedSize: Size;
  quantity: number;
}

export interface FilterPreset {
  id: string;
  name: string;
  filters: FilterState;
  createdAt: string;
}
