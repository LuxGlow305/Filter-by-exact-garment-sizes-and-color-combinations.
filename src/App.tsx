import React, { useState, useMemo, useEffect } from 'react';
import { INITIAL_PRODUCTS } from './data/products';
import {
  FilterState,
  Product,
  CartItem,
  FilterPreset,
  Size,
  ColorVariant,
} from './types';
import {
  filterProducts,
  DEFAULT_FILTER_STATE,
  getActiveFilterCount,
} from './utils/filterUtils';
import { Navbar } from './components/Navbar';
import { FilterSidebar } from './components/FilterSidebar';
import { ActiveFilterBar, SortOption } from './components/ActiveFilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SizeGuideModal } from './components/SizeGuideModal';
import { SavedPresetsModal } from './components/SavedPresetsModal';
import { Sparkles, SlidersHorizontal, RefreshCw, Layers, ShieldCheck, Shirt } from 'lucide-react';

export default function App() {
  // Primary States
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTER_STATE);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [gridColumns, setGridColumns] = useState<2 | 3 | 4>(3);

  // Cart & Wishlist
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Presets
  const [presets, setPresets] = useState<FilterPreset[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_presets');
      return saved ? JSON.parse(saved) : [
        {
          id: 'preset-default-m',
          name: 'My Fits - Size M Neutrals',
          filters: { ...DEFAULT_FILTER_STATE, sizes: ['M'], colors: ['Camel', 'Off White', 'Navy'] },
          createdAt: new Date().toISOString(),
        }
      ];
    } catch {
      return [];
    }
  });

  // Modals & Drawers
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [presetsOpen, setPresetsOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [quickViewItem, setQuickViewItem] = useState<{
    product: Product | null;
    initialColor?: ColorVariant;
  }>({ product: null });

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('atelier_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('atelier_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('atelier_presets', JSON.stringify(presets));
  }, [presets]);

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    const matched = filterProducts(products, filters);

    return matched.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      // 'featured': Priority to featured items
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, filters, sortBy]);

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, color: ColorVariant, size: Size) => {
    setCart(prev => {
      const index = prev.findIndex(
        item =>
          item.product.id === product.id &&
          item.selectedColor.id === color.id &&
          item.selectedSize === size
      );

      if (index > -1) {
        const updated = [...prev];
        updated[index].quantity += 1;
        return updated;
      } else {
        return [...prev, { product, selectedColor: color, selectedSize: size, quantity: 1 }];
      }
    });
    setCartOpen(true);
  };

  const handleUpdateCartQty = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCart(prev => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  // Preset Handlers
  const handleSavePreset = (name: string) => {
    const newPreset: FilterPreset = {
      id: `preset-${Date.now()}`,
      name,
      filters: { ...filters },
      createdAt: new Date().toISOString(),
    };
    setPresets(prev => [newPreset, ...prev]);
  };

  const handleApplyPreset = (preset: FilterPreset) => {
    setFilters(preset.filters);
  };

  const handleDeletePreset = (id: string) => {
    setPresets(prev => prev.filter(p => p.id !== id));
  };

  // Grid responsiveness class mapping
  const gridClassMap = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4',
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-sans selection:bg-amber-200 selection:text-stone-900">
      
      {/* Top Header Navbar */}
      <Navbar
        filters={filters}
        setFilters={setFilters}
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenMobileFilters={() => setMobileFiltersOpen(true)}
        onOpenPresets={() => setPresetsOpen(true)}
        onOpenSizeGuide={() => setSizeGuideOpen(true)}
        mySize={filters.sizes.length === 1 ? filters.sizes[0] : null}
        onSetMySize={sz => setFilters(p => ({ ...p, sizes: sz ? [sz as Size] : [] }))}
      />

      {/* Main Catalog Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Curated Filter Discovery Hero Banner */}
        <section className="bg-gradient-to-r from-stone-900 via-stone-800 to-zinc-900 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="max-w-2xl relative z-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-mono font-medium backdrop-blur-md">
              <Shirt className="w-3.5 h-3.5" /> Precision Size × Color Search
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-stone-100 leading-tight">
              Filter by exact garment sizes and color combinations.
            </h1>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Every garment in our collection is mapped to its exact size-color matrix. Filter by your personal size to view available colors instantly.
            </p>

            {/* Quick Demo Filter Combination Pills */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-stone-400 font-medium">Quick Combinations:</span>
              <button
                onClick={() => setFilters({ ...DEFAULT_FILTER_STATE, sizes: ['M'], colors: ['Camel', 'Off White'] })}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 transition-colors"
              >
                Size M + Camel / Off White
              </button>
              <button
                onClick={() => setFilters({ ...DEFAULT_FILTER_STATE, sizes: ['L'], colors: ['Black', 'Navy'] })}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 transition-colors"
              >
                Size L + Black / Navy
              </button>
              <button
                onClick={() => setFilters({ ...DEFAULT_FILTER_STATE, sizes: ['S'], categories: ['Knitwear', 'Outerwear'] })}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 transition-colors"
              >
                Size S + Outerwear
              </button>
            </div>
          </div>
        </section>

        {/* Main Grid Layout: Sidebar + Product Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block sticky top-24">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              products={products}
              onSavePresetModalOpen={() => setPresetsOpen(true)}
            />
          </div>

          {/* Catalog Content Area */}
          <div className="flex-1 w-full">
            
            {/* Active Filters Summary Bar */}
            <ActiveFilterBar
              filters={filters}
              setFilters={setFilters}
              matchingCount={filteredProducts.length}
              totalCount={products.length}
              sortBy={sortBy}
              setSortBy={setSortBy}
              gridColumns={gridColumns}
              setGridColumns={setGridColumns}
            />

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className={`grid ${gridClassMap[gridColumns]} gap-6`}>
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    activeFilterSizes={filters.sizes}
                    activeFilterColors={filters.colors}
                    isWishlisted={wishlist.some(p => p.id === product.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onAddToCart={handleAddToCart}
                    onQuickView={(p, initialCol) => setQuickViewItem({ product: p, initialColor: initialCol })}
                  />
                ))}
              </div>
            ) : (
              /* Empty State when zero results match the specific Size & Color matrix */
              <div className="bg-white rounded-3xl border border-stone-200 p-10 text-center space-y-4 max-w-lg mx-auto my-12 shadow-2xs">
                <div className="w-16 h-16 bg-amber-50 text-amber-800 rounded-full flex items-center justify-center mx-auto border border-amber-200">
                  <SlidersHorizontal className="w-8 h-8" />
                </div>

                <h3 className="font-serif text-xl font-medium text-stone-900">
                  No exact match for this combination
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {filters.sizes.length > 0 && filters.colors.length > 0
                    ? `No items are currently in stock for Size ${filters.sizes.join(', ')} in ${filters.colors.join(', ')}.`
                    : 'No items match all your active search and filter criteria.'}
                </p>

                <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
                  {filters.colors.length > 0 && (
                    <button
                      onClick={() => setFilters(p => ({ ...p, colors: [] }))}
                      className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition-colors"
                    >
                      Clear Color Filter
                    </button>
                  )}
                  {filters.sizes.length > 0 && (
                    <button
                      onClick={() => setFilters(p => ({ ...p, sizes: [] }))}
                      className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition-colors"
                    >
                      Clear Size Filter
                    </button>
                  )}
                  <button
                    onClick={() => setFilters(DEFAULT_FILTER_STATE)}
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="mt-16 bg-stone-900 text-stone-400 text-xs border-t border-stone-800 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div>
            <span className="font-serif text-lg font-medium text-white tracking-widest block mb-1">ATELIER STUDIO</span>
            <p className="text-stone-400">Seamless clothing store with size & color filter matrix</p>
          </div>
          <div className="flex items-center gap-6 text-stone-300">
            <button onClick={() => setSizeGuideOpen(true)} className="hover:text-white">Size Guide</button>
            <button onClick={() => setPresetsOpen(true)} className="hover:text-white">Filter Presets</button>
            <button onClick={() => setCartOpen(true)} className="hover:text-white">Bag ({cart.length})</button>
          </div>
        </div>
      </footer>

      {/* Mobile Filter Drawer Overlay */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-stone-900/60 backdrop-blur-sm p-4 overflow-y-auto flex justify-center items-start pt-12">
          <div className="w-full max-w-md">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              products={products}
              onSavePresetModalOpen={() => setPresetsOpen(true)}
              onCloseMobileDrawer={() => setMobileFiltersOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewItem.product}
        initialColor={quickViewItem.initialColor}
        onClose={() => setQuickViewItem({ product: null })}
        isWishlisted={quickViewItem.product ? wishlist.some(p => p.id === quickViewItem.product!.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onOpenSizeGuide={() => setSizeGuideOpen(true)}
      />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCart([])}
      />

      {/* Wishlist Slide-Over Drawer */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onQuickView={p => setQuickViewItem({ product: p })}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        onSelectSize={sz => setFilters(p => ({ ...p, sizes: [sz] }))}
      />

      {/* Saved Filter Presets Modal */}
      <SavedPresetsModal
        isOpen={presetsOpen}
        onClose={() => setPresetsOpen(false)}
        currentFilters={filters}
        presets={presets}
        onSavePreset={handleSavePreset}
        onApplyPreset={handleApplyPreset}
        onDeletePreset={handleDeletePreset}
      />

    </div>
  );
}
