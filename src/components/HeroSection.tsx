import React from 'react';
import type { Brand, Product, Category } from '../types';
import { 
  ArrowRight, ShieldCheck, Sparkles, TrendingUp, 
  Star, ShoppingBag, Eye, Heart, Layers, Award, Users, CheckCircle2 
} from 'lucide-react';

interface HeroProps {
  onExploreBrands: () => void;
  onListBrand: () => void;
  categories: Category[];
  brands: Brand[];
  featuredProducts: Product[];
  onSelectBrand: (brand: Brand) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
}

export const HeroSection: React.FC<HeroProps> = ({
  onExploreBrands,
  onListBrand,
  brands,
  featuredProducts,
  onSelectBrand,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds
}) => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none z-0">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-500/15 dark:bg-blue-600/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-sky-400/15 dark:bg-sky-500/20 rounded-full blur-3xl animate-float-reverse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 relative z-10">
        
        {/* Main Hero Header Banner */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-200 dark:border-sky-800/60 bg-sky-50/80 dark:bg-sky-950/50 backdrop-blur-md shadow-sm">
            <Sparkles className="w-4 h-4 text-sky-500" />
            <span className="text-xs font-bold text-sky-700 dark:text-sky-300 tracking-wide uppercase">
              The Next-Gen Multi-Vendor Hub
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping"></span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            Discover Every Brand. <br className="hidden sm:inline" />
            Shop Everything. <span className="gradient-text-primary">One Platform.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Browse products from hundreds of verified premium brands, compare specs side-by-side, discover exclusive festival offers, and shop smarter.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onExploreBrands}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              Explore Storefronts
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onListBrand}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-base shadow-md backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5 text-sky-500" />
              List Your Brand Store
            </button>
          </div>

          {/* Social Proof Badges */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-semibold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Verified Merchant Badges
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-500" /> Instant Side-by-Side Comparison
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-500" /> AI Powered Shopping Assistant
            </span>
          </div>
        </div>

        {/* Animated Floating Background Card Grid Showcase */}
        <div className="mt-16 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {featuredProducts.slice(0, 3).map((product, idx) => {
              const isWishlisted = wishlistIds.includes(product.id);
              return (
                <div
                  key={product.id}
                  className={`glass-card rounded-3xl p-5 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden ${
                    idx === 0 ? 'animate-float' : idx === 1 ? 'animate-float-slow' : 'animate-float-reverse'
                  }`}
                >
                  <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Brand Badge overlay */}
                    <div className="absolute top-3 left-3 flex items-center gap-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-white/20">
                      <img src={product.brandLogo} alt={product.brandName} className="w-5 h-5 rounded-full object-cover" />
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{product.brandName}</span>
                    </div>

                    <button
                      onClick={() => onToggleWishlist(product)}
                      className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition cursor-pointer ${
                        isWishlisted ? 'bg-rose-500 text-white' : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:text-rose-500'
                      }`}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-sky-600 dark:text-sky-400 font-bold uppercase tracking-wider">{product.category}</span>
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{product.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-slate-900 dark:text-white text-base line-clamp-1 group-hover:text-blue-600 transition">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
                      <div>
                        <span className="text-lg font-black text-slate-900 dark:text-white">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-slate-400 line-through ml-2">${product.originalPrice}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onQuickView(product)}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 hover:text-blue-600 transition cursor-pointer"
                          title="Quick View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onAddToCart(product)}
                          className="px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-blue-600 dark:hover:bg-sky-400 text-xs font-bold transition flex items-center gap-1.5 shadow-md cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Metrics Showcase */}
        <div className="mt-20 glass-card rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="flex items-center justify-center text-blue-600 dark:text-sky-400 mb-2">
              <Award className="w-6 h-6" />
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">500+</p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Verified Brands</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center text-sky-500 mb-2">
              <Layers className="w-6 h-6" />
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">45,000+</p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Curated Products</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center text-indigo-500 mb-2">
              <Users className="w-6 h-6" />
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">1.2M+</p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Active Shoppers</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center text-amber-500 mb-2">
              <TrendingUp className="w-6 h-6" />
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">99.8%</p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">On-time Delivery</p>
          </div>
        </div>

        {/* Featured Brand Grid Header Section */}
        <div className="mt-20 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-sky-400 uppercase tracking-widest">Storefront Directory</span>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-1">Featured Flagship Brands</h2>
            </div>
            <button
              onClick={onExploreBrands}
              className="text-sm font-bold text-blue-600 dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              View All 500+ Storefronts →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <div
                key={brand.id}
                onClick={() => onSelectBrand(brand)}
                className="glass-card rounded-3xl overflow-hidden hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group border border-slate-200 dark:border-slate-800/80 shadow-lg"
              >
                {/* Cover Image */}
                <div className="h-32 relative overflow-hidden bg-slate-900">
                  <img
                    src={brand.coverImage}
                    alt={brand.name}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  
                  {brand.verified && (
                    <span className="absolute top-3 right-3 bg-emerald-500/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md flex items-center gap-1 shadow">
                      <ShieldCheck className="w-3 h-3" /> Verified Store
                    </span>
                  )}
                </div>

                {/* Brand Details */}
                <div className="p-6 relative pt-0">
                  {/* Brand Logo Avatar */}
                  <div className="-mt-10 mb-4 inline-block p-1 bg-white dark:bg-slate-900 rounded-2xl shadow-xl">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 transition">
                        {brand.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs font-bold text-slate-800 dark:text-slate-200">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span>{brand.rating}</span>
                        <span className="text-slate-400 font-normal">({brand.reviewCount.toLocaleString()})</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {brand.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">
                        {brand.productCount} Products Available
                      </span>
                      <span className="text-blue-600 dark:text-sky-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Visit Store <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
