import { Product } from '../types';

export const ALL_SIZES: Array<'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'> = [
  'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'
];

export const COLOR_PALETTES = [
  { name: 'Black', hex: '#18181b', family: 'Monochrome' },
  { name: 'Off White', hex: '#f4f4f5', family: 'Neutrals' },
  { name: 'Charcoal', hex: '#3f3f46', family: 'Monochrome' },
  { name: 'Navy', hex: '#1e293b', family: 'Neutrals' },
  { name: 'Camel', hex: '#c2410c', family: 'Earth Tones' },
  { name: 'Olive', hex: '#3f6212', family: 'Earth Tones' },
  { name: 'Terracotta', hex: '#9a3412', family: 'Earth Tones' },
  { name: 'Sage', hex: '#84cc16', family: 'Pastels' },
  { name: 'Dusty Rose', hex: '#f43f5e', family: 'Pastels' },
  { name: 'Soft Blue', hex: '#38bdf8', family: 'Pastels' },
  { name: 'Cobalt', hex: '#1d4ed8', family: 'Vibrant' },
  { name: 'Emerald', hex: '#047857', family: 'Vibrant' },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Atelier Minimal Double-Breasted Trench',
    brand: 'Studio Edition',
    category: 'Outerwear',
    description: 'Crafted from water-repellent organic cotton twill with relaxed shoulders and horn buttons. Designed for effortless year-round layering.',
    price: 285,
    originalPrice: 340,
    rating: 4.9,
    reviewCount: 128,
    fit: 'Oversized',
    material: 'Organic Cotton',
    isNew: true,
    isFeatured: true,
    careInstructions: ['Dry clean only', 'Cool iron with press cloth', 'Store on structured hanger'],
    colors: [
      {
        id: 'c-p1-camel',
        name: 'Camel',
        hex: '#b45309',
        image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800',
        secondaryImage: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        inStock: true
      },
      {
        id: 'c-p1-black',
        name: 'Black',
        hex: '#18181b',
        image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800',
        secondaryImage: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800',
        sizes: ['S', 'M', 'L', 'XXL'],
        inStock: true
      },
      {
        id: 'c-p1-olive',
        name: 'Olive',
        hex: '#3f6212',
        image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&q=80&w=800',
        sizes: ['M', 'L', 'XL'],
        inStock: true
      }
    ]
  },
  {
    id: 'p2',
    name: 'Heavyweight Merino Wool Chunky Knit',
    brand: 'Nordic Craft',
    category: 'Knitwear',
    description: 'Spun from extra-fine 100% Merino wool with a soft hand-feel and ribbed crew collar. Warm, breathable, and naturally odor-resistant.',
    price: 165,
    rating: 4.8,
    reviewCount: 94,
    fit: 'Regular',
    material: 'Merino Wool',
    isBestSeller: true,
    careInstructions: ['Hand wash cold gently', 'Dry flat in shade', 'Do not wring or hang'],
    colors: [
      {
        id: 'c-p2-offwhite',
        name: 'Off White',
        hex: '#f4f4f5',
        image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800',
        secondaryImage: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800',
        sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL'],
        inStock: true
      },
      {
        id: 'c-p2-charcoal',
        name: 'Charcoal',
        hex: '#3f3f46',
        image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800',
        sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
        inStock: true
      },
      {
        id: 'c-p2-sage',
        name: 'Sage',
        hex: '#84cc16',
        image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800',
        sizes: ['XS', 'S', 'M'],
        inStock: true
      }
    ]
  },
  {
    id: 'p3',
    name: 'French Linen Relaxed Resort Shirt',
    brand: 'Riviera Standard',
    category: 'Tops & Shirts',
    description: '100% Normandy flax linen tailored with a camp collar, mother-of-pearl buttons, and a airy, breathable texture ideal for warm days.',
    price: 110,
    originalPrice: 135,
    rating: 4.7,
    reviewCount: 210,
    fit: 'Relaxed',
    material: 'French Linen',
    isFeatured: true,
    careInstructions: ['Machine wash cool gentle', 'Hang dry', 'Steam for soft finish'],
    colors: [
      {
        id: 'c-p3-navy',
        name: 'Navy',
        hex: '#1e293b',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        inStock: true
      },
      {
        id: 'c-p3-terracotta',
        name: 'Terracotta',
        hex: '#9a3412',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
        sizes: ['M', 'L', 'XL'],
        inStock: true
      },
      {
        id: 'c-p3-softblue',
        name: 'Soft Blue',
        hex: '#38bdf8',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
        sizes: ['XXS', 'XS', 'S', 'M', 'L'],
        inStock: true
      }
    ]
  },
  {
    id: 'p4',
    name: 'Japanese Selvedge Denim Straight Trousers',
    brand: 'Kuroki Mill',
    category: 'Trousers & Denim',
    description: 'Woven on vintage shuttle looms in Okayama using 13.5oz organic cotton. Clean high-rise straight silhouette with copper hardware.',
    price: 195,
    rating: 4.9,
    reviewCount: 88,
    fit: 'Tailored',
    material: 'Japanese Denim',
    isNew: true,
    careInstructions: ['Wash inside out cold', 'Hang dry away from sun', 'Avoid light fabrics initially'],
    colors: [
      {
        id: 'c-p4-black',
        name: 'Black',
        hex: '#18181b',
        image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&q=80&w=800',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        inStock: true
      },
      {
        id: 'c-p4-cobalt',
        name: 'Cobalt',
        hex: '#1d4ed8',
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        inStock: true
      }
    ]
  },
  {
    id: 'p5',
    name: 'Silk Blend Slip Midi Dress',
    brand: 'Maison Luxe',
    category: 'Dresses & Skirts',
    description: 'Bias-cut drape dress with delicate adjustable straps and a soft sheen finish. Transitions seamlessly from daytime layering to evening wear.',
    price: 220,
    originalPrice: 260,
    rating: 4.8,
    reviewCount: 76,
    fit: 'Slim',
    material: 'Silk Blend',
    isFeatured: true,
    careInstructions: ['Hand wash cold or dry clean', 'Line dry in shade', 'Low iron on reverse'],
    colors: [
      {
        id: 'c-p5-emerald',
        name: 'Emerald',
        hex: '#047857',
        image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800',
        sizes: ['XXS', 'XS', 'S', 'M', 'L'],
        inStock: true
      },
      {
        id: 'c-p5-dustyrose',
        name: 'Dusty Rose',
        hex: '#f43f5e',
        image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=800',
        sizes: ['XS', 'S', 'M', 'L'],
        inStock: true
      },
      {
        id: 'c-p5-black',
        name: 'Black',
        hex: '#18181b',
        image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800',
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        inStock: true
      }
    ]
  },
  {
    id: 'p6',
    name: 'Pure Cashmere Relaxed V-Neck Cardigan',
    brand: 'Highland Co.',
    category: 'Knitwear',
    description: 'Luxurious 2-ply Grade-A Mongolian cashmere with ribbed cuffs and horn buttons. Exceptionally soft and featherlight warmth.',
    price: 290,
    rating: 5.0,
    reviewCount: 62,
    fit: 'Relaxed',
    material: 'Cashmere',
    isBestSeller: true,
    careInstructions: ['Hand wash with cashmere shampoo', 'Lay flat to dry', 'Store folded'],
    colors: [
      {
        id: 'c-p6-camel',
        name: 'Camel',
        hex: '#c2410c',
        image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800',
        sizes: ['S', 'M', 'L', 'XL'],
        inStock: true
      },
      {
        id: 'c-p6-offwhite',
        name: 'Off White',
        hex: '#f4f4f5',
        image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800',
        sizes: ['XXS', 'XS', 'S', 'M'],
        inStock: true
      },
      {
        id: 'c-p6-charcoal',
        name: 'Charcoal',
        hex: '#3f3f46',
        image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800',
        sizes: ['M', 'L', 'XL', 'XXL'],
        inStock: true
      }
    ]
  },
  {
    id: 'p7',
    name: 'Organic Cotton Heavyweight Zip Hoodie',
    brand: 'Essential Basic',
    category: 'Activewear',
    description: '450 GSM organic French terry cotton with reinforced double stitching and YKK antique brass zipper.',
    price: 125,
    rating: 4.6,
    reviewCount: 156,
    fit: 'Regular',
    material: 'Organic Cotton',
    careInstructions: ['Machine wash warm', 'Tumble dry low', 'Do not bleach'],
    colors: [
      {
        id: 'c-p7-charcoal',
        name: 'Charcoal',
        hex: '#3f3f46',
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800',
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
        inStock: true
      },
      {
        id: 'c-p7-sage',
        name: 'Sage',
        hex: '#84cc16',
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800',
        sizes: ['S', 'M', 'L'],
        inStock: true
      },
      {
        id: 'c-p7-navy',
        name: 'Navy',
        hex: '#1e293b',
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800',
        sizes: ['M', 'L', 'XL', 'XXL'],
        inStock: true
      }
    ]
  },
  {
    id: 'p8',
    name: 'Tailored Wide-Leg Wool Blend Trousers',
    brand: 'Studio Edition',
    category: 'Trousers & Denim',
    description: 'Structured high-waist trousers with front pleats, slant side pockets, and a floor-sweeping fluid silhouette.',
    price: 175,
    originalPrice: 210,
    rating: 4.8,
    reviewCount: 89,
    fit: 'Tailored',
    material: 'Merino Wool',
    isNew: true,
    careInstructions: ['Dry clean only', 'Cool iron'],
    colors: [
      {
        id: 'c-p8-black',
        name: 'Black',
        hex: '#18181b',
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800',
        sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL'],
        inStock: true
      },
      {
        id: 'c-p8-camel',
        name: 'Camel',
        hex: '#c2410c',
        image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&q=80&w=800',
        sizes: ['S', 'M', 'L'],
        inStock: true
      },
      {
        id: 'c-p8-offwhite',
        name: 'Off White',
        hex: '#f4f4f5',
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800',
        sizes: ['XS', 'S', 'M'],
        inStock: true
      }
    ]
  },
  {
    id: 'p9',
    name: 'Lambskin Leather Minimalist Bomber Jacket',
    brand: 'Atelier Heritage',
    category: 'Outerwear',
    description: 'Supple full-grain lambskin with satin cupro lining, minimalist ribbing, and custom matte dark metal zipper.',
    price: 490,
    rating: 4.9,
    reviewCount: 43,
    fit: 'Slim',
    material: 'Organic Cotton', // (Leather accent)
    isFeatured: true,
    careInstructions: ['Professional leather specialist clean only', 'Keep in dust cover'],
    colors: [
      {
        id: 'c-p9-black',
        name: 'Black',
        hex: '#18181b',
        image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&q=80&w=800',
        sizes: ['S', 'M', 'L', 'XL'],
        inStock: true
      },
      {
        id: 'c-p9-terracotta',
        name: 'Terracotta',
        hex: '#9a3412',
        image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&q=80&w=800',
        sizes: ['M', 'L'],
        inStock: true
      }
    ]
  },
  {
    id: 'p10',
    name: 'Pleated High-Waisted A-Line Skirt',
    brand: 'Maison Luxe',
    category: 'Dresses & Skirts',
    description: 'Crisp knife pleats engineered to hold memory through wear. Concealed side zip closure and graceful midi length.',
    price: 140,
    rating: 4.6,
    reviewCount: 67,
    fit: 'Regular',
    material: 'Organic Cotton',
    careInstructions: ['Gentle cycle cold', 'Hang dry by waist tape', 'Do not tumble dry'],
    colors: [
      {
        id: 'c-p10-sage',
        name: 'Sage',
        hex: '#84cc16',
        image: 'https://images.unsplash.com/photo-1582142839970-2b93220b605d?auto=format&fit=crop&q=80&w=800',
        sizes: ['XS', 'S', 'M', 'L'],
        inStock: true
      },
      {
        id: 'c-p10-black',
        name: 'Black',
        hex: '#18181b',
        image: 'https://images.unsplash.com/photo-1582142839970-2b93220b605d?auto=format&fit=crop&q=80&w=800',
        sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL'],
        inStock: true
      },
      {
        id: 'c-p10-dustyrose',
        name: 'Dusty Rose',
        hex: '#f43f5e',
        image: 'https://images.unsplash.com/photo-1582142839970-2b93220b605d?auto=format&fit=crop&q=80&w=800',
        sizes: ['S', 'M'],
        inStock: true
      }
    ]
  },
  {
    id: 'p11',
    name: 'Quilted Lightweight Puffer Outer Vest',
    brand: 'Nordic Craft',
    category: 'Outerwear',
    description: 'Recycled insulation shell with high neck guard and double slider zip. Packs down compactly into inner chest pocket.',
    price: 155,
    originalPrice: 180,
    rating: 4.7,
    reviewCount: 112,
    fit: 'Regular',
    material: 'Organic Cotton',
    isBestSeller: true,
    careInstructions: ['Machine wash cold gentle with tennis balls', 'Tumble dry low'],
    colors: [
      {
        id: 'c-p11-olive',
        name: 'Olive',
        hex: '#3f6212',
        image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&q=80&w=800',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        inStock: true
      },
      {
        id: 'c-p11-navy',
        name: 'Navy',
        hex: '#1e293b',
        image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&q=80&w=800',
        sizes: ['M', 'L', 'XL'],
        inStock: true
      }
    ]
  },
  {
    id: 'p12',
    name: 'Organic Cotton Supima Crewneck Tee',
    brand: 'Essential Basic',
    category: 'Tops & Shirts',
    description: 'Long-staple American Supima cotton offering unmatchable silkiness, durability, and resistance to pilling after washes.',
    price: 48,
    rating: 4.9,
    reviewCount: 340,
    fit: 'Regular',
    material: 'Organic Cotton',
    isBestSeller: true,
    careInstructions: ['Machine wash warm', 'Tumble dry medium'],
    colors: [
      {
        id: 'c-p12-offwhite',
        name: 'Off White',
        hex: '#f4f4f5',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
        sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
        inStock: true
      },
      {
        id: 'c-p12-black',
        name: 'Black',
        hex: '#18181b',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
        sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
        inStock: true
      },
      {
        id: 'c-p12-charcoal',
        name: 'Charcoal',
        hex: '#3f3f46',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
        sizes: ['S', 'M', 'L', 'XL'],
        inStock: true
      },
      {
        id: 'c-p12-cobalt',
        name: 'Cobalt',
        hex: '#1d4ed8',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
        sizes: ['XS', 'S', 'M', 'L'],
        inStock: true
      }
    ]
  }
];
