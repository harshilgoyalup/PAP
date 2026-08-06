import React from 'react';
import type { Product } from '../types';
import { Tag, Clock, Zap } from 'lucide-react';

interface OffersSectionProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
}

export const OffersSection: React.FC<OffersSectionProps> = ({
  products,
  onAddToCart
}) => {
  const flashProducts = products.filter(p => p.isFlashSale || p.discountPercentage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Festival Deals Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 text-white p-8 sm:p-12 shadow-2xl border border-blue-500/20">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 via-blue-600 to-transparent"></div>
        
        <div className="relative z-10 max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 fill-current" /> Limited Festival Superdrops
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Up to <span className="text-amber-400">40% OFF</span> Verified Brand Catalogues
          </h1>

          <p className="text-sm text-slate-300">
            Exclusive coupons from Nike, Apple, Zara, Sephora & Sony unlocked directly for BrandHub members.
          </p>

          {/* Countdown Simulation */}
          <div className="flex items-center gap-3 pt-2">
            <div className="bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl text-center">
              <span className="block text-xl font-black text-amber-400">08</span>
              <span className="text-[9px] uppercase tracking-wider text-slate-300">Hours</span>
            </div>
            <span className="text-xl font-bold">:</span>
            <div className="bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl text-center">
              <span className="block text-xl font-black text-amber-400">42</span>
              <span className="text-[9px] uppercase tracking-wider text-slate-300">Mins</span>
            </div>
            <span className="text-xl font-bold">:</span>
            <div className="bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl text-center">
              <span className="block text-xl font-black text-amber-400">19</span>
              <span className="text-[9px] uppercase tracking-wider text-slate-300">Secs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Coupons grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { code: 'APPLEHUB20', desc: 'Get 20% off all Apple accessories', brand: 'Apple Store' },
          { code: 'NIKEFLY30', desc: '$30 flat discount on footwear order', brand: 'Nike Store' },
          { code: 'SEPHORABEAUTY', desc: 'Free Hydra-Serum mini on orders over $80', brand: 'Sephora Store' }
        ].map((c, i) => (
          <div key={i} className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase">{c.brand}</span>
              <Tag className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">{c.desc}</p>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <code className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg text-xs font-black text-blue-600 dark:text-sky-400">
                {c.code}
              </code>
              <button className="text-xs font-bold text-blue-600 dark:text-sky-400 hover:underline cursor-pointer">
                Claim Coupon
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Flash Sale Product Cards */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Clock className="w-6 h-6 text-amber-500" /> Flash Sale Deals
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashProducts.map((product) => (
            <div key={product.id} className="glass-card rounded-3xl p-4 border border-slate-200 dark:border-slate-800 space-y-3 relative">
              <span className="absolute top-6 left-6 z-10 bg-rose-500 text-white font-black text-[10px] px-2.5 py-1 rounded-full shadow">
                {product.discountPercentage}% OFF
              </span>
              <img src={product.image} className="w-full h-48 object-cover rounded-2xl" />
              <h3 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">{product.name}</h3>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-black text-slate-900 dark:text-white">${product.price}</span>
                  <span className="text-xs text-slate-400 line-through ml-2">${product.originalPrice}</span>
                </div>
                <button
                  onClick={() => onAddToCart(product)}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow hover:bg-blue-700 transition cursor-pointer"
                >
                  Add Deal
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
