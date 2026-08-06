import React from 'react';
import type { CartItem, Product } from '../types';
import { 
  ShoppingBag, Search, Heart, User, Sun, Moon, Sparkles, 
  Menu, X, ShieldCheck, ChevronRight, BarChart3, Tag, Compass
} from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  cart: CartItem[];
  wishlist: Product[];
  setIsCartOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currency: string;
  setCurrency: (curr: string) => void;
  onOpenAiChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  activeView,
  setActiveView,
  cart,
  wishlist,
  setIsCartOpen,
  searchQuery,
  setSearchQuery,
  currency,
  setCurrency,
  onOpenAiChat
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
      {/* Top Banner announcement */}
      <div className="bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-3">
        <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider">Verified Platform</span>
        <span>Join over 500+ Luxury & Premium Brands worldwide. Enjoy 0% commission month on all listings!</span>
        <button 
          onClick={() => setActiveView('brand-dashboard')} 
          className="underline hover:text-sky-200 transition font-semibold hidden md:inline-block cursor-pointer"
        >
          List Your Store →
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setActiveView('home')} 
              className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform duration-300">
                <span className="font-extrabold text-xl tracking-tighter">B</span>
              </div>
              <div className="text-left">
                <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                  Brand<span className="text-blue-600 dark:text-sky-400">Hub</span>
                  <ShieldCheck className="w-4 h-4 text-sky-500 inline" />
                </span>
                <span className="block text-[10px] tracking-widest text-slate-400 font-semibold uppercase -mt-1">
                  Enterprise Marketplace
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 font-medium text-sm">
              <button
                onClick={() => setActiveView('home')}
                className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
                  activeView === 'home' 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-sky-400 font-semibold' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                Discover
              </button>
              <button
                onClick={() => setActiveView('brands')}
                className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
                  activeView === 'brands' || activeView === 'brand-detail'
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-sky-400 font-semibold' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                Storefronts
              </button>
              <button
                onClick={() => setActiveView('catalog')}
                className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
                  activeView === 'catalog' 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-sky-400 font-semibold' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => setActiveView('offers')}
                className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeView === 'offers' 
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-semibold' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50/50 dark:hover:bg-amber-900/20'
                }`}
              >
                <Tag className="w-3.5 h-3.5" />
                Flash Deals
              </button>
              <button
                onClick={() => setActiveView('compare')}
                className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
                  activeView === 'compare' 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-sky-400 font-semibold' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                Compare Specs
              </button>
            </nav>
          </div>

          {/* Center Search Input */}
          <div className="hidden md:flex flex-1 max-w-md mx-6 relative">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search verified brands, products, audio, fashion..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && setActiveView('catalog')}
                className="w-full pl-10 pr-24 py-2 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              <button
                onClick={onOpenAiChat}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full bg-gradient-to-r from-blue-600 to-sky-400 text-white text-xs font-medium flex items-center gap-1 shadow-sm hover:opacity-90 transition cursor-pointer"
              >
                <Sparkles className="w-3 h-3 animate-spin-slow" />
                AI Smart
              </button>
            </div>
          </div>

          {/* Right Action Icons & User Hub */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency Selector */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-transparent border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-700 dark:text-slate-300 font-semibold focus:outline-none hidden sm:block cursor-pointer"
            >
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
              <option value="GBP">£ GBP</option>
              <option value="INR">₹ INR</option>
            </select>

            {/* AI Shopping Assistant Button */}
            <button
              onClick={onOpenAiChat}
              title="AI Assistant & Smart Search"
              className="p-2.5 rounded-xl border border-sky-200 dark:border-sky-900/50 bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 hover:scale-105 transition-all shadow-sm flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-sky-500" />
              <span className="hidden sm:inline">AI Shopping Hub</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all focus:outline-none cursor-pointer"
              title="Toggle Light / Dark Mode"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => setActiveView('customer-dashboard')}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all relative focus:outline-none cursor-pointer"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all relative focus:outline-none cursor-pointer"
              title="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* User Dropdown / Portal Selector */}
            <div className="relative group">
              <button
                onClick={() => setActiveView('customer-dashboard')}
                className="flex items-center gap-2 p-1.5 pr-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition cursor-pointer"
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                  alt="User avatar"
                  className="w-7 h-7 rounded-lg object-cover"
                />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 hidden sm:inline">Account</span>
              </button>

              <div className="absolute right-0 top-full mt-2 w-56 glass-card rounded-2xl p-2 shadow-2xl border border-slate-200 dark:border-slate-800 hidden group-hover:block transition-all z-50">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800/80 mb-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Alex Morgan</p>
                  <p className="text-[11px] text-slate-400">VIP Brand Member</p>
                </div>

                <button
                  onClick={() => setActiveView('customer-dashboard')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2"><User className="w-4 h-4 text-blue-500" /> Customer Account</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => setActiveView('brand-dashboard')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-800 flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2"><BarChart3 className="w-4 h-4 text-sky-500" /> Brand Merchant Portal</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900/95 text-white border-t border-slate-800 p-4 space-y-3">
          <input
            type="text"
            placeholder="Search brands or products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-slate-800 text-sm border border-slate-700 text-white placeholder-slate-400 mb-3"
          />
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => { setActiveView('home'); setMobileMenuOpen(false); }}
              className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-left text-sm font-semibold flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-sky-400" /> Discover
            </button>
            <button 
              onClick={() => { setActiveView('brands'); setMobileMenuOpen(false); }}
              className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-left text-sm font-semibold flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-blue-400" /> Storefronts
            </button>
            <button 
              onClick={() => { setActiveView('catalog'); setMobileMenuOpen(false); }}
              className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-left text-sm font-semibold flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-indigo-400" /> Catalog
            </button>
            <button 
              onClick={() => { setActiveView('offers'); setMobileMenuOpen(false); }}
              className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-left text-sm font-semibold flex items-center gap-2 cursor-pointer"
            >
              <Tag className="w-4 h-4 text-amber-400" /> Flash Sales
            </button>
            <button 
              onClick={() => { setActiveView('brand-dashboard'); setMobileMenuOpen(false); }}
              className="col-span-2 p-3 rounded-xl bg-blue-600 text-white text-center text-sm font-bold shadow-lg cursor-pointer"
            >
              Brand Portal Dashboard →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
