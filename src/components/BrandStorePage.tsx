import React from 'react';
import type { Brand, Product } from '../types';
import { 
  ShieldCheck, MapPin, Globe, Star, ArrowRight, Share2, 
  Heart, ShoppingBag, Eye, CheckCircle2, MessageSquare, PhoneCall 
} from 'lucide-react';

interface BrandStorePageProps {
  brand: Brand;
  products: Product[];
  onBackToBrands: () => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
}

export const BrandStorePage: React.FC<BrandStorePageProps> = ({
  brand,
  products,
  onBackToBrands,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds
}) => {
  const [selectedTab, setSelectedTab] = React.useState<'products' | 'collections' | 'reviews' | 'about'>('products');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = React.useState<string>('all');

  const brandProducts = products.filter(p => p.brandId === brand.id || p.brandName.toLowerCase() === brand.name.toLowerCase());
  const filteredProducts = selectedCategoryFilter === 'all' 
    ? brandProducts 
    : brandProducts.filter(p => p.category.toLowerCase() === selectedCategoryFilter.toLowerCase());

  return (
    <div className="min-h-screen pb-20">
      {/* Brand Hero Cover Banner */}
      <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-950">
        <img
          src={brand.coverImage}
          alt={brand.name}
          className="w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

        {/* Top Floating Controls */}
        <div className="absolute top-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full left-1/2 -translate-x-1/2 flex justify-between items-center z-10">
          <button
            onClick={onBackToBrands}
            className="px-4 py-2 rounded-xl bg-black/40 hover:bg-black/70 text-white text-xs font-bold backdrop-blur-md transition flex items-center gap-1.5 cursor-pointer"
          >
            ← Back to Storefronts
          </button>
          <div className="flex gap-2">
            <button className="p-2.5 rounded-xl bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition cursor-pointer">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-lg transition flex items-center gap-1.5 cursor-pointer">
              + Follow Store
            </button>
          </div>
        </div>

        {/* Brand Header Banner Profile */}
        <div className="absolute bottom-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full left-1/2 -translate-x-1/2 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 z-10">
          <div className="flex items-end gap-5">
            <div className="p-1 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shrink-0">
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover"
              />
            </div>
            <div className="text-white space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-3xl sm:text-4xl font-black">{brand.name}</h1>
                {brand.verified && (
                  <span className="bg-sky-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow">
                    <ShieldCheck className="w-3.5 h-3.5" /> Official Flagship Store
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-4 flex-wrap">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-sky-400" /> {brand.location}</span>
                <span>Est. {brand.established}</span>
                <a href={brand.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sky-400 hover:underline">
                  <Globe className="w-3.5 h-3.5" /> Official Website
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 bg-white/10 dark:bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-white">
            <div className="text-center px-2">
              <div className="flex items-center justify-center gap-1 text-amber-400 font-black text-lg">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{brand.rating}</span>
              </div>
              <span className="text-[10px] text-slate-300 font-medium">{brand.reviewCount} Reviews</span>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center px-2">
              <p className="font-black text-lg text-sky-400">{brand.productCount}</p>
              <span className="text-[10px] text-slate-300 font-medium">In-Stock Items</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-slate-200 dark:border-slate-800 space-x-8 mb-8 overflow-x-auto">
          <button
            onClick={() => setSelectedTab('products')}
            className={`pb-4 font-bold text-sm transition relative whitespace-nowrap cursor-pointer ${
              selectedTab === 'products' ? 'text-blue-600 dark:text-sky-400' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Products ({brandProducts.length})
            {selectedTab === 'products' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-sky-400 rounded-full"></span>}
          </button>
          <button
            onClick={() => setSelectedTab('collections')}
            className={`pb-4 font-bold text-sm transition relative whitespace-nowrap cursor-pointer ${
              selectedTab === 'collections' ? 'text-blue-600 dark:text-sky-400' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Curated Collections ({brand.featuredCollections.length})
            {selectedTab === 'collections' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-sky-400 rounded-full"></span>}
          </button>
          <button
            onClick={() => setSelectedTab('reviews')}
            className={`pb-4 font-bold text-sm transition relative whitespace-nowrap cursor-pointer ${
              selectedTab === 'reviews' ? 'text-blue-600 dark:text-sky-400' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Verified Ratings & Reviews
            {selectedTab === 'reviews' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-sky-400 rounded-full"></span>}
          </button>
          <button
            onClick={() => setSelectedTab('about')}
            className={`pb-4 font-bold text-sm transition relative whitespace-nowrap cursor-pointer ${
              selectedTab === 'about' ? 'text-blue-600 dark:text-sky-400' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Store Information
            {selectedTab === 'about' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-sky-400 rounded-full"></span>}
          </button>
        </div>

        {/* Tab 1: Products Listing */}
        {selectedTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Store Catalog</h2>
              <div className="flex gap-2 text-xs font-semibold">
                <button
                  onClick={() => setSelectedCategoryFilter('all')}
                  className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${selectedCategoryFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
                >
                  All Items
                </button>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 glass-card rounded-3xl space-y-3">
                <p className="text-slate-400 font-medium">No items found matching this filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => {
                  const isWishlisted = wishlistIds.includes(product.id);
                  return (
                    <div
                      key={product.id}
                      className="glass-card rounded-3xl p-4 hover:-translate-y-1 transition-all duration-300 group border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 bg-slate-100 dark:bg-slate-800">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <button
                            onClick={() => onToggleWishlist(product)}
                            className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition cursor-pointer ${
                              isWishlisted ? 'bg-rose-500 text-white' : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200'
                            }`}
                          >
                            <Heart className="w-4 h-4 fill-current" />
                          </button>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-400 uppercase font-semibold">{product.category}</span>
                            <span className="flex items-center text-amber-400 font-bold gap-1">
                              <Star className="w-3 h-3 fill-amber-400" /> {product.rating}
                            </span>
                          </div>

                          <h3 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1 group-hover:text-blue-600 transition">
                            {product.name}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80">
                        <div>
                          <span className="text-base font-black text-slate-900 dark:text-white">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-slate-400 line-through ml-1.5">${product.originalPrice}</span>
                          )}
                        </div>

                        <div className="flex gap-1.5">
                          <button
                            onClick={() => onQuickView(product)}
                            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition cursor-pointer"
                            title="Quick View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onAddToCart(product)}
                            className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" /> Add
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Collections */}
        {selectedTab === 'collections' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {brand.featuredCollections.map((col, idx) => (
              <div key={idx} className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 hover:border-blue-500 transition">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-sky-400 flex items-center justify-center font-bold text-lg">
                  0{idx + 1}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{col}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Exclusive flagship series curated directly by {brand.name} design laboratory for modern lifestyle.
                </p>
                <button className="text-xs font-bold text-blue-600 dark:text-sky-400 flex items-center gap-1 hover:underline cursor-pointer">
                  Browse Collection <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Reviews */}
        {selectedTab === 'reviews' && (
          <div className="space-y-6">
            <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-3xl font-black text-slate-900 dark:text-white">{brand.rating} / 5.0</p>
                <p className="text-xs text-slate-500">Based on {brand.reviewCount.toLocaleString()} verified buyer feedback posts</p>
              </div>
              <button className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold cursor-pointer">
                Write Store Review
              </button>
            </div>

            <div className="space-y-4">
              <div className="glass-card rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Sophia Bennett</p>
                      <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Verified Customer
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  "Fast shipping directly from {brand.name} official warehouse. Packaging was pristine and products are 100% authentic!"
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Store Info */}
        {selectedTab === 'about' && (
          <div className="glass-card rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-6 max-w-3xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">About {brand.name}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {brand.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
                <span className="text-slate-400 font-medium">Headquarters</span>
                <p className="font-bold text-slate-900 dark:text-white">{brand.location}</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
                <span className="text-slate-400 font-medium">Year Established</span>
                <p className="font-bold text-slate-900 dark:text-white">{brand.established}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-3">
              <button className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center gap-2 cursor-pointer">
                <MessageSquare className="w-4 h-4" /> Message Store Support
              </button>
              <button className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-2 cursor-pointer">
                <PhoneCall className="w-4 h-4" /> Contact Representative
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
