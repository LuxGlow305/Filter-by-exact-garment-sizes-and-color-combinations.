import React, { useState } from 'react';
import {
  SlidersHorizontal,
  RotateCcw,
  Check,
  Info,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Bookmark,
  Layers,
  CircleDot
} from 'lucide-react';
import { FilterState, Size, Category, FitType, Material } from '../types';
import { ALL_SIZES, COLOR_PALETTES } from '../data/products';
import {
  getProductCountsPerSize,
  getProductCountsPerColor,
  getActiveFilterCount,
  DEFAULT_FILTER_STATE
} from '../utils/filterUtils';
import { Product } from '../types';

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  products: Product[];
  onSavePresetModalOpen: () => void;
  onCloseMobileDrawer?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilters,
  products,
  onSavePresetModalOpen,
  onCloseMobileDrawer,
}) => {
  const [activeColorFamily, setActiveColorFamily] = useState<string>('All');
  const [showLogicInfo, setShowLogicInfo] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    sizes: true,
    colors: true,
    categories: true,
    price: true,
    fitAndMaterial: true,
    special: true,
  });

  const sizeCounts = getProductCountsPerSize(products, filters);
  const colorCounts = getProductCountsPerColor(products, filters);
  const activeCount = getActiveFilterCount(filters);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Size handler
  const handleSizeToggle = (size: Size) => {
    setFilters(prev => {
      const exists = prev.sizes.includes(size);
      const newSizes = exists
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes: newSizes };
    });
  };

  // Color handler
  const handleColorToggle = (colorName: string) => {
    setFilters(prev => {
      const exists = prev.colors.includes(colorName);
      const newColors = exists
        ? prev.colors.filter(c => c !== colorName)
        : [...prev.colors, colorName];
      return { ...prev, colors: newColors };
    });
  };

  // Category handler
  const handleCategoryToggle = (category: Category) => {
    setFilters(prev => {
      const exists = prev.categories.includes(category);
      const newCategories = exists
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories: newCategories };
    });
  };

  // Fit handler
  const handleFitToggle = (fit: FitType) => {
    setFilters(prev => {
      const exists = prev.fits.includes(fit);
      const newFits = exists
        ? prev.fits.filter(f => f !== fit)
        : [...prev.fits, fit];
      return { ...prev, fits: newFits };
    });
  };

  // Material handler
  const handleMaterialToggle = (material: Material) => {
    setFilters(prev => {
      const exists = prev.materials.includes(material);
      const newMaterials = exists
        ? prev.materials.filter(m => m !== material)
        : [...prev.materials, material];
      return { ...prev, materials: newMaterials };
    });
  };

  const handleReset = () => {
    setFilters(DEFAULT_FILTER_STATE);
  };

  const filteredColorPalettes = COLOR_PALETTES.filter(c => 
    activeColorFamily === 'All' || c.family === activeColorFamily
  );

  const CATEGORY_LIST: Category[] = [
    'Outerwear',
    'Knitwear',
    'Tops & Shirts',
    'Trousers & Denim',
    'Dresses & Skirts',
    'Activewear',
  ];

  const FIT_LIST: FitType[] = ['Slim', 'Regular', 'Relaxed', 'Oversized', 'Tailored'];

  const MATERIAL_LIST: Material[] = [
    'Organic Cotton',
    'Merino Wool',
    'French Linen',
    'Japanese Denim',
    'Cashmere',
    'Silk Blend',
  ];

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-6">
      
      {/* Header & Clear */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-stone-900" />
          <h2 className="font-serif text-lg font-medium text-stone-900">Filters</h2>
          {activeCount > 0 && (
            <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
              {activeCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <button
              onClick={handleReset}
              className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 font-medium transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Clear
            </button>
          )}
          {onCloseMobileDrawer && (
            <button
              onClick={onCloseMobileDrawer}
              className="lg:hidden text-xs text-stone-500 font-medium p-1 hover:bg-stone-100 rounded"
            >
              Done
            </button>
          )}
        </div>
      </div>

      {/* MATRIX LOGIC MODE TOGGLE */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-700" /> Matrix Combination
          </span>
          <button
            onClick={() => setShowLogicInfo(!showLogicInfo)}
            className="text-stone-400 hover:text-stone-700 p-0.5"
            title="Filter Logic Explanation"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>

        {showLogicInfo && (
          <p className="text-[11px] text-stone-600 bg-white p-2 rounded-lg border border-stone-200 leading-relaxed">
            <strong>Strict (Match BOTH)</strong> shows products that have a color variant available in your exact selected size. <strong>Flexible (Match EITHER)</strong> broadens results.
          </p>
        )}

        <div className="grid grid-cols-2 gap-1 bg-stone-200/60 p-1 rounded-lg">
          <button
            onClick={() => setFilters(p => ({ ...p, matchMode: 'all' }))}
            className={`py-1.5 px-2 text-[11px] font-medium rounded-md transition-all text-center ${
              filters.matchMode === 'all'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Match BOTH
          </button>
          <button
            onClick={() => setFilters(p => ({ ...p, matchMode: 'any' }))}
            className={`py-1.5 px-2 text-[11px] font-medium rounded-md transition-all text-center ${
              filters.matchMode === 'any'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Match EITHER
          </button>
        </div>
      </div>

      {/* SIZE FILTER SECTION */}
      <div className="border-b border-stone-100 pb-5">
        <button
          onClick={() => toggleSection('sizes')}
          className="w-full flex items-center justify-between text-left py-1"
        >
          <span className="text-sm font-semibold text-stone-900">
            Size {filters.sizes.length > 0 && <span className="text-amber-700 font-normal">({filters.sizes.length})</span>}
          </span>
          {expandedSections.sizes ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
        </button>

        {expandedSections.sizes && (
          <div className="mt-3 space-y-2">
            <div className="grid grid-cols-4 gap-1.5">
              {ALL_SIZES.map(sz => {
                const isSelected = filters.sizes.includes(sz);
                const count = sizeCounts[sz] || 0;
                const isDisabled = count === 0 && !isSelected;

                return (
                  <button
                    key={sz}
                    onClick={() => handleSizeToggle(sz)}
                    disabled={isDisabled}
                    className={`relative py-2 px-1 text-xs font-semibold rounded-lg border transition-all flex flex-col items-center justify-center ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                        : isDisabled
                        ? 'bg-stone-50 text-stone-300 border-stone-100 cursor-not-allowed line-through'
                        : 'bg-white text-stone-800 border-stone-200 hover:border-stone-400 hover:bg-stone-50'
                    }`}
                  >
                    <span>{sz}</span>
                    <span className={`text-[10px] mt-0.5 font-normal ${isSelected ? 'text-stone-300' : 'text-stone-400'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
            {filters.sizes.length > 0 && (
              <button
                onClick={() => setFilters(p => ({ ...p, sizes: [] }))}
                className="text-[11px] text-stone-500 hover:text-stone-900 underline pt-1 block"
              >
                Clear size selection
              </button>
            )}
          </div>
        )}
      </div>

      {/* COLOR SWATCH FILTER SECTION */}
      <div className="border-b border-stone-100 pb-5">
        <button
          onClick={() => toggleSection('colors')}
          className="w-full flex items-center justify-between text-left py-1"
        >
          <span className="text-sm font-semibold text-stone-900">
            Color Palette {filters.colors.length > 0 && <span className="text-amber-700 font-normal">({filters.colors.length})</span>}
          </span>
          {expandedSections.colors ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
        </button>

        {expandedSections.colors && (
          <div className="mt-3 space-y-3">
            {/* Color Family Sub-Tabs */}
            <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none text-[11px]">
              {['All', 'Neutrals', 'Earth Tones', 'Monochrome', 'Pastels'].map(family => (
                <button
                  key={family}
                  onClick={() => setActiveColorFamily(family)}
                  className={`px-2 py-0.5 rounded-full whitespace-nowrap transition-colors ${
                    activeColorFamily === family
                      ? 'bg-stone-800 text-white font-medium'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {family}
                </button>
              ))}
            </div>

            {/* Color Swatch Grid */}
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1 text-xs">
              {filteredColorPalettes.map(c => {
                const isSelected = filters.colors.includes(c.name);
                const count = colorCounts[c.name] || 0;

                return (
                  <button
                    key={c.name}
                    onClick={() => handleColorToggle(c.name)}
                    className={`flex items-center gap-2 p-1.5 rounded-lg border transition-all text-left ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                        : 'bg-stone-50 text-stone-800 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-stone-300 shadow-2xs flex-shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: c.hex }}
                    >
                      {isSelected && (
                        <Check className={`w-2.5 h-2.5 ${c.hex === '#f4f4f5' ? 'text-stone-900' : 'text-white'}`} />
                      )}
                    </span>
                    <span className="truncate flex-1 font-medium text-[11px]">{c.name}</span>
                    <span className={`text-[10px] ${isSelected ? 'text-stone-300' : 'text-stone-400'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {filters.colors.length > 0 && (
              <button
                onClick={() => setFilters(p => ({ ...p, colors: [] }))}
                className="text-[11px] text-stone-500 hover:text-stone-900 underline pt-1 block"
              >
                Clear color selection
              </button>
            )}
          </div>
        )}
      </div>

      {/* CATEGORIES SECTION */}
      <div className="border-b border-stone-100 pb-5">
        <button
          onClick={() => toggleSection('categories')}
          className="w-full flex items-center justify-between text-left py-1"
        >
          <span className="text-sm font-semibold text-stone-900">Category</span>
          {expandedSections.categories ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
        </button>

        {expandedSections.categories && (
          <div className="mt-3 space-y-1.5 text-xs">
            {CATEGORY_LIST.map(cat => {
              const isChecked = filters.categories.includes(cat);
              const count = products.filter(p => p.category === cat).length;

              return (
                <label
                  key={cat}
                  className="flex items-center justify-between py-1 px-1.5 rounded hover:bg-stone-50 cursor-pointer transition-colors text-stone-700"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCategoryToggle(cat)}
                      className="rounded border-stone-300 text-stone-900 focus:ring-stone-800"
                    />
                    <span>{cat}</span>
                  </div>
                  <span className="text-[10px] text-stone-400 font-mono">({count})</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* PRICE RANGE SECTION */}
      <div className="border-b border-stone-100 pb-5">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between text-left py-1"
        >
          <span className="text-sm font-semibold text-stone-900">Price Range</span>
          {expandedSections.price ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
        </button>

        {expandedSections.price && (
          <div className="mt-3 space-y-3">
            <div className="flex items-center justify-between gap-2 text-xs">
              <div className="flex-1 bg-stone-50 border border-stone-200 rounded-lg p-1.5">
                <span className="text-[10px] text-stone-400 block">Min ($)</span>
                <input
                  type="number"
                  min={0}
                  max={filters.priceRange[1]}
                  value={filters.priceRange[0]}
                  onChange={e => {
                    const val = Math.max(0, Number(e.target.value));
                    setFilters(p => ({ ...p, priceRange: [val, p.priceRange[1]] }));
                  }}
                  className="w-full font-semibold text-stone-900 bg-transparent focus:outline-none"
                />
              </div>
              <span className="text-stone-300">-</span>
              <div className="flex-1 bg-stone-50 border border-stone-200 rounded-lg p-1.5">
                <span className="text-[10px] text-stone-400 block">Max ($)</span>
                <input
                  type="number"
                  min={filters.priceRange[0]}
                  max={500}
                  value={filters.priceRange[1]}
                  onChange={e => {
                    const val = Math.min(500, Number(e.target.value));
                    setFilters(p => ({ ...p, priceRange: [p.priceRange[0], val] }));
                  }}
                  className="w-full font-semibold text-stone-900 bg-transparent focus:outline-none"
                />
              </div>
            </div>

            <input
              type="range"
              min={0}
              max={500}
              step={10}
              value={filters.priceRange[1]}
              onChange={e => {
                const val = Number(e.target.value);
                setFilters(p => ({ ...p, priceRange: [p.priceRange[0], val] }));
              }}
              className="w-full accent-stone-900 h-1 bg-stone-200 rounded-lg cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* FIT & MATERIAL SECTION */}
      <div className="border-b border-stone-100 pb-5">
        <button
          onClick={() => toggleSection('fitAndMaterial')}
          className="w-full flex items-center justify-between text-left py-1"
        >
          <span className="text-sm font-semibold text-stone-900">Fit & Fabric</span>
          {expandedSections.fitAndMaterial ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
        </button>

        {expandedSections.fitAndMaterial && (
          <div className="mt-3 space-y-4">
            <div>
              <span className="text-[11px] font-medium text-stone-500 uppercase tracking-wider block mb-1.5">
                Fit Silhouette
              </span>
              <div className="flex flex-wrap gap-1">
                {FIT_LIST.map(f => {
                  const isSelected = filters.fits.includes(f);
                  return (
                    <button
                      key={f}
                      onClick={() => handleFitToggle(f)}
                      className={`px-2 py-1 text-[11px] rounded-full border transition-all ${
                        isSelected
                          ? 'bg-stone-900 text-white border-stone-900 font-medium'
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      {f}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-medium text-stone-500 uppercase tracking-wider block mb-1.5">
                Material / Fabric
              </span>
              <div className="flex flex-wrap gap-1">
                {MATERIAL_LIST.map(m => {
                  const isSelected = filters.materials.includes(m);
                  return (
                    <button
                      key={m}
                      onClick={() => handleMaterialToggle(m)}
                      className={`px-2 py-1 text-[11px] rounded-full border transition-all ${
                        isSelected
                          ? 'bg-stone-900 text-white border-stone-900 font-medium'
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SPECIAL TOGGLES */}
      <div className="space-y-2 pt-1 text-xs">
        <label className="flex items-center justify-between p-2 rounded-lg bg-stone-50 border border-stone-200 cursor-pointer hover:bg-stone-100 transition-colors">
          <span className="font-medium text-stone-800">In Stock Only</span>
          <input
            type="checkbox"
            checked={filters.onlyInStock}
            onChange={e => setFilters(p => ({ ...p, onlyInStock: e.target.checked }))}
            className="rounded border-stone-300 text-stone-900 focus:ring-stone-800"
          />
        </label>

        <label className="flex items-center justify-between p-2 rounded-lg bg-stone-50 border border-stone-200 cursor-pointer hover:bg-stone-100 transition-colors">
          <span className="font-medium text-stone-800">On Sale Items</span>
          <input
            type="checkbox"
            checked={filters.onSaleOnly}
            onChange={e => setFilters(p => ({ ...p, onSaleOnly: e.target.checked }))}
            className="rounded border-stone-300 text-stone-900 focus:ring-stone-800"
          />
        </label>
      </div>

      {/* SAVE PRESET BUTTON */}
      <button
        onClick={onSavePresetModalOpen}
        className="w-full py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-colors border border-stone-200"
      >
        <Bookmark className="w-3.5 h-3.5 text-stone-700" />
        <span>Save Active Filter Preset</span>
      </button>

    </aside>
  );
};
