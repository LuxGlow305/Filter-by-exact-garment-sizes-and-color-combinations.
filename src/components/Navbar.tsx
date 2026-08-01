import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, SlidersHorizontal, Sparkles, X, BookmarkCheck } from 'lucide-react';
import { FilterState } from '../types';
import { getActiveFilterCount } from '../utils/filterUtils';

interface NavbarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenMobileFilters: () => void;
  onOpenPresets: () => void;
  onOpenSizeGuide: () => void;
  mySize: string | null;
  onSetMySize: (size: string | null) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  filters,
  setFilters,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenMobileFilters,
  onOpenPresets,
  onOpenSizeGuide,
  mySize,
  onSetMySize,
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const activeCount = getActiveFilterCount(filters);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
  };

  const clearSearch = () => {
    setFilters(prev => ({ ...prev, searchQuery: '' }));
  };

  return (
    <header className="sticky top-0 z-30 bg-stone-50/90 backdrop-blur-md border-b border-stone-200 transition-all duration-200">
      {/* Top Utility Announcement Bar */}
      <div className="bg-stone-900 text-stone-200 text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-3">
        <span className="inline-flex items-center gap-1 text-amber-300">
          <Sparkles className="w-3 h-3" /> Matrix Filter Engine
        </span>
        <span className="hidden sm:inline text-stone-400">|</span>
        <span className="hidden sm:inline">Filter instantly by exact Size × Color in-stock availability</span>
        <span className="hidden md:inline text-stone-400">|</span>
        <button 
          onClick={onOpenSizeGuide}
          className="underline hover:text-white transition-colors text-[11px]"
        >
          View Size & Fit Guide
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenMobileFilters}
              className="lg:hidden p-2 -ml-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors relative"
              aria-label="Open filter sidebar"
            >
              <SlidersHorizontal className="w-5 h-5" />
              {activeCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-600 rounded-full" />
              )}
            </button>

            <a href="#" className="flex items-center gap-2 group">
              <span className="font-serif text-2xl tracking-widest text-stone-900 font-medium group-hover:text-amber-800 transition-colors">
                ATELIER
              </span>
              <span className="text-[10px] uppercase tracking-widest text-stone-500 font-sans border border-stone-300 px-1.5 py-0.5 rounded">
                Studio
              </span>
            </a>
          </div>

          {/* Search Bar - Center */}
          <div className="flex-1 max-w-md hidden sm:block relative">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search cashmere, linen, trench coat, olive..."
                value={filters.searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-stone-200 rounded-full focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-all placeholder:text-stone-400"
              />
              {filters.searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-2.5 p-1 text-stone-400 hover:text-stone-700 rounded-full"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Action Links & Utility Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Preset Manager Button */}
            <button
              onClick={onOpenPresets}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors"
              title="Saved Filter Presets"
            >
              <BookmarkCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Filter Presets</span>
            </button>

            {/* Quick "My Size" Profile Toggle */}
            <div className="hidden lg:flex items-center text-xs border border-stone-200 rounded-full p-0.5 bg-white">
              <span className="px-2 text-stone-500 font-medium text-[11px]">My Size:</span>
              {['S', 'M', 'L', 'XL'].map(sz => {
                const isSelected = filters.sizes.length === 1 && filters.sizes[0] === sz;
                return (
                  <button
                    key={sz}
                    onClick={() => {
                      if (isSelected) {
                        setFilters(p => ({ ...p, sizes: [] }));
                      } else {
                        setFilters(p => ({ ...p, sizes: [sz as any] }));
                      }
                    }}
                    className={`px-2 py-0.5 rounded-full font-semibold transition-all ${
                      isSelected
                        ? 'bg-stone-900 text-white shadow-xs'
                        : 'text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="sm:hidden p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors relative"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 pl-3 pr-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-full transition-colors text-xs font-medium shadow-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Bag</span>
              {cartCount > 0 && (
                <span className="bg-amber-500 text-stone-950 font-bold px-1.5 py-0.2 text-[11px] rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>

        {/* Mobile Search Input Drawer */}
        {searchOpen && (
          <div className="sm:hidden pb-3 pt-1 border-t border-stone-200">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search styles, sizes, or colors..."
                value={filters.searchQuery}
                onChange={handleSearchChange}
                autoFocus
                className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-stone-300 rounded-full focus:outline-none focus:border-stone-900"
              />
              {filters.searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-2.5 p-1 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
