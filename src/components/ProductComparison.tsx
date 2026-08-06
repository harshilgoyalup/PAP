import React from 'react';
import type { Product } from '../types';
import { Star, X, ShoppingBag } from 'lucide-react';

interface ProductComparisonProps {
  comparedProducts: Product[];
  onRemoveCompare: (id: string) => void;
  onClearCompare: () => void;
  onAddToCart: (product: Product) => void;
  onBrowseCatalog: () => void;
}

export const ProductComparison: React.FC<ProductComparisonProps> = ({
  comparedProducts,
  onRemoveCompare,
  onClearCompare,
  onAddToCart,
  onBrowseCatalog
}) => {
  if (comparedProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-20 h-20 rounded-3xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-sky-400 flex items-center justify-center mx-auto text-2xl font-bold">
          VS
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">Product Specs Comparison Matrix</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Compare specs, warranty, ratings, prices, and seller perks side-by-side from multiple verified brand storefronts.
        </p>
        <button
          onClick={onBrowseCatalog}
          className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold text-sm shadow-lg hover:bg-blue-700 transition cursor-pointer"
        >
          Select Products to Compare
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-sky-400 uppercase tracking-widest">Side-by-Side Matrix</span>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mt-1">Product Specs Comparison</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onBrowseCatalog}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            + Add Another Item
          </button>
          <button
            onClick={onClearCompare}
            className="px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-100 transition cursor-pointer"
          >
            Clear Matrix
          </button>
        </div>
      </div>

      {/* Comparison Grid Table */}
      <div className="overflow-x-auto pb-6">
        <table className="w-full min-w-[700px] border-collapse text-left">
          <thead>
            <tr>
              <th className="p-4 w-48 text-xs font-bold text-slate-400 uppercase tracking-wider bg-transparent">Feature / Spec</th>
              {comparedProducts.map((product) => (
                <th key={product.id} className="p-4 w-72 align-top">
                  <div className="glass-card rounded-3xl p-4 border border-slate-200 dark:border-slate-800 relative space-y-3">
                    <button
                      onClick={() => onRemoveCompare(product.id)}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-500 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    
                    <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-2xl" />
                    
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                      <img src={product.brandLogo} className="w-4 h-4 rounded-full" />
                      <span>{product.brandName}</span>
                    </div>

                    <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-2">{product.name}</h4>
                    
                    <p className="text-xl font-black text-blue-600 dark:text-sky-400">${product.price}</p>
                    
                    <button
                      onClick={() => onAddToCart(product)}
                      className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md hover:bg-blue-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
            {/* Rating */}
            <tr>
              <td className="p-4 font-bold text-slate-900 dark:text-white">Rating & Reviews</td>
              {comparedProducts.map((p) => (
                <td key={p.id} className="p-4 text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-1 font-bold text-amber-500">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{p.rating}</span>
                    <span className="text-slate-400 font-normal">({p.reviewCount} reviews)</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Availability */}
            <tr>
              <td className="p-4 font-bold text-slate-900 dark:text-white">Stock Status</td>
              {comparedProducts.map((p) => (
                <td key={p.id} className="p-4">
                  {p.inStock ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                      In Stock ({p.stockQuantity} units)
                    </span>
                  ) : (
                    <span className="text-rose-500 font-bold">Out of Stock</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Category */}
            <tr>
              <td className="p-4 font-bold text-slate-900 dark:text-white">Category</td>
              {comparedProducts.map((p) => (
                <td key={p.id} className="p-4 uppercase font-semibold text-slate-600 dark:text-slate-400">
                  {p.category}
                </td>
              ))}
            </tr>

            {/* Warranty */}
            <tr>
              <td className="p-4 font-bold text-slate-900 dark:text-white">Manufacturer Warranty</td>
              {comparedProducts.map((p) => (
                <td key={p.id} className="p-4 text-slate-700 dark:text-slate-300 font-medium">
                  {p.warranty}
                </td>
              ))}
            </tr>

            {/* Dynamic Specifications */}
            <tr>
              <td className="p-4 font-bold text-slate-900 dark:text-white">Key Specifications</td>
              {comparedProducts.map((p) => (
                <td key={p.id} className="p-4 space-y-1">
                  {Object.entries(p.specifications).map(([key, val]) => (
                    <div key={key} className="text-[11px]">
                      <span className="text-slate-400 font-medium">{key}: </span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{val}</span>
                    </div>
                  ))}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
