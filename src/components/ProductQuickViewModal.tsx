import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, ShieldCheck, RefreshCw, Truck, Check, Info } from 'lucide-react';
import { Product, ColorVariant, Size } from '../types';

interface ProductQuickViewModalProps {
  product: Product | null;
  initialColor?: ColorVariant;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, color: ColorVariant, size: Size) => void;
  onOpenSizeGuide: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  initialColor,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpenSizeGuide,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<ColorVariant>(
    initialColor || product.colors[0]
  );
  const [selectedSize, setSelectedSize] = useState<Size | null>(
    selectedColor.sizes[0] || null
  );
  const [activeImage, setActiveImage] = useState<string>(
    selectedColor.image
  );
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleColorSelect = (color: ColorVariant) => {
    setSelectedColor(color);
    setActiveImage(color.image);
    // Keep or reset size based on availability in new color
    if (!selectedSize || !color.sizes.includes(selectedSize)) {
      setSelectedSize(color.sizes[0] || null);
    }
  };

  const handleAdd = () => {
    if (!selectedSize) return;
    onAddToCart(product, selectedColor, selectedSize);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-stone-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-900 bg-stone-100 rounded-full z-20 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Gallery */}
          <div className="p-6 bg-stone-50 flex flex-col justify-between space-y-4 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
            
            <div className="relative aspect-3/4 rounded-2xl overflow-hidden bg-white shadow-xs">
              <img
                src={activeImage}
                alt={`${product.name} in ${selectedColor.name}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <button
                onClick={() => onToggleWishlist(product)}
                className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all ${
                  isWishlisted ? 'bg-rose-50 text-rose-600 shadow-sm' : 'bg-white/80 text-stone-700 hover:text-stone-900'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-600' : ''}`} />
              </button>
            </div>

            {/* Thumbnail selector */}
            <div className="flex gap-2 justify-center overflow-x-auto py-1">
              <button
                onClick={() => setActiveImage(selectedColor.image)}
                className={`w-14 h-18 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImage === selectedColor.image ? 'border-stone-900 shadow-xs' : 'border-stone-200 opacity-60'
                }`}
              >
                <img src={selectedColor.image} alt="Main" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </button>

              {selectedColor.secondaryImage && (
                <button
                  onClick={() => setActiveImage(selectedColor.secondaryImage!)}
                  className={`w-14 h-18 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === selectedColor.secondaryImage ? 'border-stone-900 shadow-xs' : 'border-stone-200 opacity-60'
                  }`}
                >
                  <img src={selectedColor.secondaryImage} alt="Secondary" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              )}
            </div>

          </div>

          {/* Right Column: Details & Size/Color Matrix */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              
              {/* Category & Brand */}
              <div className="flex items-center justify-between text-xs text-stone-500 font-medium uppercase tracking-wider">
                <span>{product.brand} • {product.category}</span>
                <span className="flex items-center gap-1 font-mono text-stone-800">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Title & Price */}
              <div>
                <h2 className="font-serif text-2xl text-stone-900 font-medium">
                  {product.name}
                </h2>
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="font-sans text-2xl font-bold text-stone-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-stone-400 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                  <span className="text-xs bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-full font-medium">
                    Fit: {product.fit}
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {product.description}
              </p>

              {/* COLOR SELECTION */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-800">
                    Select Color: <strong className="text-stone-900">{selectedColor.name}</strong>
                  </span>
                  <span className="text-stone-400 font-mono text-[11px]">{product.colors.length} Available</span>
                </div>

                <div className="flex items-center gap-2">
                  {product.colors.map(color => {
                    const isSelected = color.id === selectedColor.id;
                    return (
                      <button
                        key={color.id}
                        onClick={() => handleColorSelect(color)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all text-xs ${
                          isSelected
                            ? 'bg-stone-900 text-white border-stone-900 font-medium shadow-xs'
                            : 'bg-stone-50 text-stone-800 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-stone-300 shadow-2xs"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SIZE SELECTION MATRIX */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-800">
                    Select Size for <span className="text-amber-800 font-bold">{selectedColor.name}</span>:
                  </span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-stone-600 hover:text-stone-900 underline text-[11px] font-medium"
                  >
                    Size & Fit Guide
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {(['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'] as Size[]).map(sz => {
                    const isAvailable = selectedColor.sizes.includes(sz);
                    const isSelected = selectedSize === sz;

                    return (
                      <button
                        key={sz}
                        onClick={() => isAvailable && setSelectedSize(sz)}
                        disabled={!isAvailable}
                        className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-amber-950 text-white border-amber-950 shadow-xs'
                            : isAvailable
                            ? 'bg-white text-stone-900 border-stone-300 hover:border-stone-900'
                            : 'bg-stone-100 text-stone-300 border-stone-100 cursor-not-allowed line-through'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Material & Care */}
              <div className="bg-stone-50 rounded-2xl p-3 border border-stone-200 text-xs space-y-1">
                <div className="flex items-center justify-between font-semibold text-stone-800">
                  <span>Composition: {product.material}</span>
                </div>
                <div className="text-[11px] text-stone-500">
                  Care: {product.careInstructions.join(' • ')}
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="space-y-3 pt-4 border-t border-stone-100">
              <button
                onClick={handleAdd}
                disabled={!selectedSize}
                className={`w-full py-3.5 px-6 rounded-2xl font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                  addedSuccess
                    ? 'bg-emerald-700 text-white'
                    : selectedSize
                    ? 'bg-stone-900 hover:bg-stone-800 text-white'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Shopping Bag!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>
                      Add {selectedColor.name} {selectedSize ? `(Size ${selectedSize})` : ''} - ${product.price}
                    </span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-around text-[11px] text-stone-500 pt-1">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-stone-700" /> Free Shipping &gt; $150
                </span>
                <span className="flex items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 text-stone-700" /> 30-Day Easy Returns
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
