import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Eye, Check, Sparkles } from 'lucide-react';
import { Product, ColorVariant, Size, FilterState } from '../types';

interface ProductCardProps {
  product: Product;
  activeFilterSizes: Size[];
  activeFilterColors: string[];
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, color: ColorVariant, size: Size) => void;
  onQuickView: (product: Product, initialColor?: ColorVariant) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  activeFilterSizes,
  activeFilterColors,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
}) => {
  // Determine initial color variant: prefer one matching the active color filter if present
  const initialColor = product.colors.find(c => activeFilterColors.includes(c.name)) || product.colors[0];
  const [selectedColor, setSelectedColor] = useState<ColorVariant>(initialColor);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [sizePickerOpen, setSizePickerOpen] = useState(false);
  const [chosenSize, setChosenSize] = useState<Size | null>(
    activeFilterSizes.length > 0 && selectedColor.sizes.includes(activeFilterSizes[0])
      ? activeFilterSizes[0]
      : null
  );

  const displayImage = hoveredImage || selectedColor.image;

  // Calculate discount percentage if on sale
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleColorChange = (color: ColorVariant, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedColor(color);
    setHoveredImage(null);
    // Adjust chosen size if current choice is not in new color
    if (chosenSize && !color.sizes.includes(chosenSize)) {
      setChosenSize(null);
    }
  };

  const handleQuickAdd = (size: Size, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedColor, size);
    setSizePickerOpen(false);
  };

  return (
    <div className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col relative">
      
      {/* Image Container */}
      <div 
        className="relative aspect-3/4 bg-stone-100 overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product, selectedColor)}
        onMouseEnter={() => {
          if (selectedColor.secondaryImage) {
            setHoveredImage(selectedColor.secondaryImage);
          }
        }}
        onMouseLeave={() => setHoveredImage(null)}
      >
        <img
          src={displayImage}
          alt={`${product.name} in ${selectedColor.name}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start z-10 pointer-events-none">
          {product.isNew && (
            <span className="bg-stone-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wider uppercase shadow-xs">
              New
            </span>
          )}
          {discountPercent && (
            <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wider uppercase shadow-xs">
              -{discountPercent}%
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wider uppercase shadow-xs">
              Popular
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 shadow-sm scale-110'
              : 'bg-white/80 hover:bg-white text-stone-700 hover:text-stone-900 shadow-xs'
          }`}
          aria-label="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Hover Quick View Overlay Button */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product, selectedColor);
            }}
            className="w-full py-2 bg-white/95 hover:bg-white text-stone-900 font-medium text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" /> Quick View
          </button>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium tracking-wider uppercase mb-1">
            <span>{product.brand}</span>
            <span className="flex items-center gap-1 text-stone-700 font-mono font-semibold">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView(product, selectedColor)}
            className="font-serif text-base text-stone-900 font-medium line-clamp-1 hover:text-amber-800 cursor-pointer transition-colors"
          >
            {product.name}
          </h3>

          {/* Price & Material */}
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-baseline gap-2">
              <span className="font-sans font-bold text-base text-stone-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[11px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full font-medium">
              {product.material}
            </span>
          </div>
        </div>

        {/* Color Variants Swatches */}
        <div className="space-y-1.5 pt-2 border-t border-stone-100">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-stone-500 font-medium">Color: <strong className="text-stone-900 font-semibold">{selectedColor.name}</strong></span>
            <span className="text-stone-400 font-mono text-[10px]">{product.colors.length} option{product.colors.length > 1 ? 's' : ''}</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {product.colors.map((color) => {
              const isSelected = color.id === selectedColor.id;
              const matchesActiveFilter = activeFilterColors.includes(color.name);

              return (
                <button
                  key={color.id}
                  onClick={(e) => handleColorChange(color, e)}
                  title={`${color.name} (${color.sizes.join(', ')})`}
                  className={`relative p-0.5 rounded-full transition-all flex-shrink-0 ${
                    isSelected
                      ? 'ring-2 ring-stone-900 ring-offset-1 scale-110'
                      : 'hover:scale-105 opacity-80 hover:opacity-100'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full block border border-stone-300 shadow-2xs"
                    style={{ backgroundColor: color.hex }}
                  />
                  {matchesActiveFilter && !isSelected && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Size Availability Row for current color */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-[10px] text-stone-500">
            <span>Available in <strong className="text-stone-800">{selectedColor.name}</strong>:</span>
            <span className="font-mono">{selectedColor.sizes.length} sizes</span>
          </div>

          <div className="flex flex-wrap gap-1">
            {selectedColor.sizes.map((sz) => {
              const isFilterMatched = activeFilterSizes.includes(sz);

              return (
                <button
                  key={sz}
                  onClick={(e) => handleQuickAdd(sz, e)}
                  className={`text-[10px] px-1.5 py-0.5 font-mono font-semibold rounded transition-all ${
                    isFilterMatched
                      ? 'bg-amber-100 text-amber-950 border border-amber-300 font-bold'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-900 hover:text-white'
                  }`}
                  title={`Quick Add Size ${sz}`}
                >
                  {sz}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
