import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product, ColorVariant, Size } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onQuickView,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-stone-200 shadow-2xl flex flex-col justify-between">
          
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
              <h2 className="font-serif text-lg font-medium text-stone-900">
                Saved Wishlist ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlist.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <Heart className="w-12 h-12 text-stone-300 mx-auto" />
                <p className="text-sm text-stone-600 font-medium">Your wishlist is empty.</p>
                <p className="text-xs text-stone-400">Save your favorite styles while filtering by size & color.</p>
              </div>
            ) : (
              wishlist.map(product => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 bg-stone-50 rounded-2xl border border-stone-200 relative group"
                >
                  <img
                    src={product.colors[0].image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover object-center rounded-xl bg-white border border-stone-200 cursor-pointer"
                    onClick={() => {
                      onQuickView(product);
                      onClose();
                    }}
                  />

                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            onQuickView(product);
                            onClose();
                          }}
                          className="font-serif text-sm font-medium text-stone-900 line-clamp-1 hover:text-amber-800 cursor-pointer"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(product)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-0.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-xs text-stone-500">{product.brand}</span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-sm text-stone-900">${product.price}</span>
                      <button
                        onClick={() => {
                          onQuickView(product);
                          onClose();
                        }}
                        className="px-3 py-1 bg-stone-900 text-white text-xs font-medium rounded-lg hover:bg-stone-800 transition-colors flex items-center gap-1"
                      >
                        <ShoppingBag className="w-3 h-3" /> Select Size
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
