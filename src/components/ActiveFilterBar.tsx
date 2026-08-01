import React from 'react';
import { X, ArrowUpDown, LayoutGrid, Grid3x3, Columns2 } from 'lucide-react';
import { FilterState, Size, Category, FitType, Material } from '../types';
import { DEFAULT_FILTER_STATE } from '../utils/filterUtils';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

interface ActiveFilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  matchingCount: number;
  totalCount: number;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  gridColumns: 2 | 3 | 4;
  setGridColumns: (cols: 2 | 3 | 4) => void;
}

export const ActiveFilterBar: React.FC<ActiveFilterBarProps> = ({
  filters,
  setFilters,
  matchingCount,
  totalCount,
  sortBy,
  setSortBy,
  gridColumns,
  setGridColumns,
}) => {
  const removeSize = (sz: Size) => {
    setFilters(p => ({ ...p, sizes: p.sizes.filter(s => s !== sz) }));
  };

  const removeColor = (color: string) => {
    setFilters(p => ({ ...p, colors: p.colors.filter(c => c !== color) }));
  };

  const removeCategory = (cat: Category) => {
    setFilters(p => ({ ...p, categories: p.categories.filter(c => c !== cat) }));
  };

  const removeFit = (fit: FitType) => {
    setFilters(p => ({ ...p, fits: p.fits.filter(f => f !== fit) }));
  };

  const removeMaterial = (mat: Material) => {
    setFilters(p => ({ ...p, materials: p.materials.filter(m => m !== mat) }));
  };

  const resetPrice = () => {
    setFilters(p => ({ ...p, priceRange: [0, 500] }));
  };

  const hasActiveFilters =
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.categories.length > 0 ||
    filters.fits.length > 0 ||
    filters.materials.length > 0 ||
    filters.onlyInStock ||
    filters.onSaleOnly ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 500 ||
    filters.searchQuery.trim() !== '';

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-2xs space-y-3 mb-6">
      
      {/* Top Bar: Count & View Tools */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-100">
        
        {/* Results Counter */}
        <div className="flex items-center gap-2 text-stone-900 font-serif">
          <span className="text-lg font-medium">
            Showing <strong className="text-amber-800 font-mono">{matchingCount}</strong> of {totalCount} items
          </span>
          {filters.sizes.length > 0 && (
            <span className="text-xs font-sans text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
              Filtered for Size: {filters.sizes.join(', ')}
            </span>
          )}
        </div>

        {/* Sort & Grid Layout Buttons */}
        <div className="flex items-center gap-3">
          
          {/* Sorting Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-stone-700 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
            <span className="text-stone-500 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortOption)}
              className="bg-transparent font-medium focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured & Best</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>

          {/* Grid View Toggles */}
          <div className="hidden md:flex items-center gap-0.5 bg-stone-100 p-0.5 rounded-lg border border-stone-200">
            <button
              onClick={() => setGridColumns(2)}
              className={`p-1.5 rounded-md transition-all ${
                gridColumns === 2 ? 'bg-white shadow-2xs text-stone-900' : 'text-stone-400 hover:text-stone-700'
              }`}
              title="2 Columns"
            >
              <Columns2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridColumns(3)}
              className={`p-1.5 rounded-md transition-all ${
                gridColumns === 3 ? 'bg-white shadow-2xs text-stone-900' : 'text-stone-400 hover:text-stone-700'
              }`}
              title="3 Columns"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridColumns(4)}
              className={`p-1.5 rounded-md transition-all ${
                gridColumns === 4 ? 'bg-white shadow-2xs text-stone-900' : 'text-stone-400 hover:text-stone-700'
              }`}
              title="4 Columns"
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Active Filter Chips Bar */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider mr-1">
            Active:
          </span>

          {/* Search Query Chip */}
          {filters.searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200">
              Query: "{filters.searchQuery}"
              <button onClick={() => setFilters(p => ({ ...p, searchQuery: '' }))} className="hover:text-amber-950">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {/* Size Chips */}
          {filters.sizes.map(sz => (
            <span
              key={sz}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-900 text-white shadow-2xs"
            >
              Size: {sz}
              <button onClick={() => removeSize(sz)} className="hover:text-stone-300">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {/* Color Chips */}
          {filters.colors.map(c => (
            <span
              key={c}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-800 border border-stone-300"
            >
              Color: {c}
              <button onClick={() => removeColor(c)} className="hover:text-stone-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {/* Category Chips */}
          {filters.categories.map(cat => (
            <span
              key={cat}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-800 border border-stone-300"
            >
              {cat}
              <button onClick={() => removeCategory(cat)} className="hover:text-stone-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {/* Fit Chips */}
          {filters.fits.map(f => (
            <span
              key={f}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-800 border border-stone-300"
            >
              Fit: {f}
              <button onClick={() => removeFit(f)} className="hover:text-stone-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {/* Material Chips */}
          {filters.materials.map(m => (
            <span
              key={m}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-800 border border-stone-300"
            >
              {m}
              <button onClick={() => removeMaterial(m)} className="hover:text-stone-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {/* Price Range Chip */}
          {(filters.priceRange[0] > 0 || filters.priceRange[1] < 500) && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-800 border border-stone-300">
              ${filters.priceRange[0]} - ${filters.priceRange[1]}
              <button onClick={resetPrice} className="hover:text-stone-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {/* Stock & Sale Chips */}
          {filters.onlyInStock && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
              In Stock Only
              <button onClick={() => setFilters(p => ({ ...p, onlyInStock: false }))} className="hover:text-emerald-950">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.onSaleOnly && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-800 border border-rose-200">
              On Sale
              <button onClick={() => setFilters(p => ({ ...p, onSaleOnly: false }))} className="hover:text-rose-950">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {/* Clear All */}
          <button
            onClick={() => setFilters(DEFAULT_FILTER_STATE)}
            className="text-xs font-medium text-stone-500 hover:text-stone-900 underline ml-2 transition-colors"
          >
            Reset All
          </button>
        </div>
      )}
    </div>
  );
};
