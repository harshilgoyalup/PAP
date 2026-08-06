import React from 'react';
import type { Product, Brand, Category } from '../types';
import { 
  Filter, Search, SlidersHorizontal, Star, Heart, 
  Eye, ShoppingBag, ArrowUpDown, Check, RefreshCw 
} from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  brands: Brand[];
  categories: Category[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  wishlistIds: string[];
  compareIds: string[];
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  brands,
  categories,
  searchQuery,
  setSearchQuery,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  onToggleCompare,
  wishlistIds,
  compareIds
}) => {
  const [selectedBrand, setSelectedBrand] = React.useState<string>('all');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [maxPrice, setMaxPrice] = React.useState<number>(1000);
  const [minRating, setMinRating] = React.useState<number>(0);
  const [inStockOnly, setInStockOnly] = React.useState<boolean>(false);
  const [sortBy, setSortBy] = React.useState<'trending' | 'price-low' | 'price-high' | 'rating'>('trending');
  const [mobileFilterOpen, setMobileFilterOpen] = React.useState<boolean>(false);

  // Filtering Logic
  const filteredProducts = React.useMemo(() => {
    return products.filter((product) => {
      // Search Query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brandName.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesCategory) return false;
      }

      // Brand Filter
      if (selectedBrand !== 'all' && product.brandId !== selectedBrand) {
        return false;
      }

      // Category Filter
      if (selectedCategory !== 'all' && product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Price Filter
      if (product.price > maxPrice) {
        return false;
      }

      // Rating Filter
      if (product.rating < minRating) {
        return false;
      }

      // Availability Filter
      if (inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
    });
  }, [products, searchQuery, selectedBrand, selectedCategory, maxPrice, minRating, inStockOnly, sortBy]);

  const resetFilters = () => {
    setSelectedBrand('all');
    setSelectedCategory('all');
    setMaxPrice(1000);
    setMinRating(0);
    setInStockOnly(false);
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-sky-400 uppercase tracking-widest">Multi-Vendor Marketplace</span>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mt-1">Explore Products</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Showing {filteredProducts.length} verified listings across top global brands</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold flex items-center gap-2 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-blue-500" /> Filters
          </button>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 bg-white dark:bg-slate-900/80">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="trending">Sort by Trending</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
        <div className={`space-y-6 lg:block ${mobileFilterOpen ? 'block' : 'hidden'}`}>
          <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <Filter className="w-4 h-4 text-blue-500" /> Filters
              </h3>
              <button
                onClick={resetFilters}
                className="text-xs text-blue-600 dark:text-sky-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Filter by Category */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Filter by Brand */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">Brand Store</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="all">All Verified Brands</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
              </select>
            </div>

            {/* Max Price Range Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-900 dark:text-white uppercase tracking-wider">Max Price</span>
                <span className="text-blue-600 dark:text-sky-400">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="25"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            {/* Minimum Rating Filter */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">Minimum Rating</label>
              <div className="flex items-center gap-2">
                {[0, 4.0, 4.5, 4.8].map((ratingVal) => (
                  <button
                    key={ratingVal}
                    onClick={() => setMinRating(ratingVal)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer ${
                      minRating === ratingVal 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {ratingVal === 0 ? 'Any' : `${ratingVal}+ ★`}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability Checkbox */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-slate-800 dark:text-slate-200">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 accent-blue-600 focus:ring-0"
                />
                In-Stock Products Only
              </label>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="glass-card rounded-3xl p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">No products found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try expanding your search query or resetting filters to see available catalog items.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const isWishlisted = wishlistIds.includes(product.id);
                const isCompared = compareIds.includes(product.id);

                return (
                  <div
                    key={product.id}
                    className="glass-card rounded-3xl p-4 hover:-translate-y-1.5 transition-all duration-300 group border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col justify-between"
                  >
                    <div>
                      {/* Product Image Box */}
                      <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-3 bg-slate-100 dark:bg-slate-800">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Brand Pill */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-xl shadow border border-white/20">
                          <img src={product.brandLogo} alt={product.brandName} className="w-4 h-4 rounded-full object-cover" />
                          <span className="text-[11px] font-bold text-slate-900 dark:text-white">{product.brandName}</span>
                        </div>

                        {/* Wishlist Button */}
                        <button
                          onClick={() => onToggleWishlist(product)}
                          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition cursor-pointer ${
                            isWishlisted ? 'bg-rose-500 text-white' : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:text-rose-500'
                          }`}
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </button>

                        {/* Compare Tag */}
                        <button
                          onClick={() => onToggleCompare(product)}
                          className={`absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold backdrop-blur-md transition flex items-center gap-1 cursor-pointer ${
                            isCompared 
                              ? 'bg-sky-500 text-white' 
                              : 'bg-black/40 hover:bg-black/70 text-white'
                          }`}
                        >
                          {isCompared ? <Check className="w-3 h-3" /> : '+ Compare'}
                        </button>
                      </div>

                      {/* Product Info */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-sky-600 dark:text-sky-400 font-bold uppercase tracking-wider">{product.category}</span>
                          <div className="flex items-center gap-1 text-amber-500 font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span>{product.rating}</span>
                            <span className="text-slate-400 text-[10px] font-normal">({product.reviewCount})</span>
                          </div>
                        </div>

                        <h3 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1 group-hover:text-blue-600 transition">
                          {product.name}
                        </h3>

                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80">
                      <div>
                        <span className="text-base font-black text-slate-900 dark:text-white">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-slate-400 line-through ml-1.5">${product.originalPrice}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onQuickView(product)}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition cursor-pointer"
                          title="Quick View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onAddToCart(product)}
                          className="px-3 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-blue-600 dark:hover:bg-sky-400 text-xs font-bold transition flex items-center gap-1.5 shadow-md cursor-pointer"
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

      </div>
    </div>
  );
};
