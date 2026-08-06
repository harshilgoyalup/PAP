import React from 'react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          
          {/* Brand Identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-white font-black text-lg shadow-md">
                B
              </div>
              <span className="text-xl font-black text-slate-900 dark:text-white">
                Brand<span className="text-blue-600 dark:text-sky-400">Hub</span>
              </span>
            </div>

            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 max-w-sm">
              The premier digital shopping mall empowering global flagship stores and discerning customers. Centralized storefronts, verified inventory, side-by-side spec matrix, and AI assistance.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">Platform</h4>
            <ul className="space-y-2 font-medium">
              <li><button onClick={() => onNavigate('home')} className="hover:text-blue-600 transition cursor-pointer">Discover Home</button></li>
              <li><button onClick={() => onNavigate('brands')} className="hover:text-blue-600 transition cursor-pointer">Storefront Directory</button></li>
              <li><button onClick={() => onNavigate('catalog')} className="hover:text-blue-600 transition cursor-pointer">Catalog Search</button></li>
              <li><button onClick={() => onNavigate('offers')} className="hover:text-blue-600 transition cursor-pointer">Flash Sale Drops</button></li>
              <li><button onClick={() => onNavigate('compare')} className="hover:text-blue-600 transition cursor-pointer">Compare Specs</button></li>
            </ul>
          </div>

          {/* Merchants & Brands */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">For Merchants</h4>
            <ul className="space-y-2 font-medium">
              <li><button onClick={() => onNavigate('brand-dashboard')} className="hover:text-blue-600 transition cursor-pointer">Seller Dashboard</button></li>
              <li><a href="#" className="hover:text-blue-600 transition">Apply for Verified Badge</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Multi-Vendor Guidelines</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">API Documentation</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Brand Analytics</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">Subscribe to Drops</h4>
            <p className="text-xs text-slate-500">Get instant alerts on limited release festival offers and new brand storefront launches.</p>
            
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to BrandHub private drops!'); }} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Enter your work email"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow hover:bg-blue-700 transition cursor-pointer"
              >
                Join Private List →
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="mt-12 pt-6 border-t border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-400">
          <p>© 2026 BrandHub Enterprise Marketplace Inc. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Security Audit</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
