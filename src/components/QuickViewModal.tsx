import React from 'react';
import type { Product } from '../types';
import { 
  X, Star, ShieldCheck, Heart, ShoppingBag, 
  Truck, RotateCcw, CheckCircle2 
} from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, color?: string, size?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = React.useState(product.image);
  const [selectedColor, setSelectedColor] = React.useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = React.useState(product.sizes?.[0] || '');
  const [addedNotice, setAddedNotice] = React.useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-card rounded-3xl w-full max-w-4xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Gallery Side */}
        <div className="md:w-1/2 p-6 bg-slate-50 dark:bg-slate-900/50 flex flex-col justify-between space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-inner">
            <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(imgUrl)}
                className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                  selectedImage === imgUrl ? 'border-blue-600 scale-105' : 'border-transparent opacity-70'
                }`}
              >
                <img src={imgUrl} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details Side */}
        <div className="md:w-1/2 p-6 sm:p-8 space-y-6 overflow-y-auto">
          {/* Brand Header */}
          <div className="flex items-center gap-2">
            <img src={product.brandLogo} className="w-6 h-6 rounded-full object-cover" />
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">{product.brandName}</span>
            <ShieldCheck className="w-4 h-4 text-sky-500" />
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white">{product.name}</h2>

          {/* Rating & Price */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <span className="text-2xl font-black text-blue-600 dark:text-sky-400">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-slate-400 line-through ml-2">${product.originalPrice}</span>
              )}
            </div>

            <div className="flex items-center gap-1 font-bold text-amber-500 text-sm">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal text-xs">({product.reviewCount} reviews)</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {product.description}
          </p>

          {/* Colors Selection */}
          {product.colors && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">Color Option</label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      selectedColor === c 
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900' 
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes Selection */}
          {product.sizes && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">Size</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      selectedSize === s 
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900' 
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handleAdd}
              className="flex-1 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              {addedNotice ? <CheckCircle2 className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
              {addedNotice ? 'Added to Cart!' : 'Add to Bag'}
            </button>

            <button
              onClick={() => onToggleWishlist(product)}
              className={`p-3.5 rounded-2xl border transition cursor-pointer ${
                isWishlisted 
                  ? 'bg-rose-500 text-white border-rose-500' 
                  : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-50'
              }`}
            >
              <Heart className="w-5 h-5 fill-current" />
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-500 font-semibold pt-2">
            <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-blue-500" /> Free Express Shipping</span>
            <span className="flex items-center gap-1.5"><RotateCcw className="w-4 h-4 text-emerald-500" /> 30-Day Hassle Returns</span>
          </div>

        </div>

      </div>
    </div>
  );
};
