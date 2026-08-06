import React from 'react';
import type { Product } from '../types';
import { 
  Heart, Award, Truck 
} from 'lucide-react';

interface CustomerDashboardProps {
  wishlist: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onRemoveWishlist: (product: Product) => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  wishlist,
  onAddToCart,
  onRemoveWishlist
}) => {
  const [activeTab, setActiveTab] = React.useState<'orders' | 'wishlist' | 'notifications'>('orders');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Profile Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
            alt="Alex Morgan Avatar"
            className="w-20 h-20 rounded-2xl object-cover shadow-md border-2 border-blue-500"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">Alex Morgan</h1>
              <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Award className="w-3 h-3 text-amber-500" /> VIP Platinum Member
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">alex.morgan@brandhub.com • Member since 2024</p>
          </div>
        </div>

        {/* Loyalty Points Counter */}
        <div className="bg-gradient-to-r from-blue-600 to-sky-500 text-white p-4 rounded-2xl shadow-lg flex items-center gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">BrandHub Rewards</span>
            <p className="text-2xl font-black">2,450 pts</p>
          </div>
          <button className="px-3 py-1.5 bg-white text-blue-600 rounded-xl font-bold text-xs shadow hover:bg-sky-50 transition cursor-pointer">
            Redeem
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-slate-200 dark:border-slate-800 space-x-6">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 font-bold text-sm transition relative cursor-pointer ${
            activeTab === 'orders' ? 'text-blue-600 dark:text-sky-400' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Tracked Orders (2)
          {activeTab === 'orders' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></span>}
        </button>
        <button
          onClick={() => setActiveTab('wishlist')}
          className={`pb-3 font-bold text-sm transition relative cursor-pointer ${
            activeTab === 'wishlist' ? 'text-blue-600 dark:text-sky-400' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Saved Wishlist ({wishlist.length})
          {activeTab === 'wishlist' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></span>}
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`pb-3 font-bold text-sm transition relative cursor-pointer ${
            activeTab === 'notifications' ? 'text-blue-600 dark:text-sky-400' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Brand Notifications
          {activeTab === 'notifications' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></span>}
        </button>
      </div>

      {/* Tab 1: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold text-slate-400">ORDER #BH-884920</span>
                <p className="text-xs text-slate-500">Placed on August 4, 2026 • Verified Apple Merchant</p>
              </div>
              <span className="bg-sky-500/10 text-sky-600 font-bold text-xs px-3 py-1 rounded-full w-fit flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" /> Out for Delivery
              </span>
            </div>

            <div className="flex items-center gap-4">
              <img src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=200&q=80" className="w-16 h-16 rounded-xl object-cover" />
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Apple AirPods Max - Space Gray</h4>
                <p className="text-xs font-black text-blue-600 dark:text-sky-400">$549.00 • Qty 1</p>
              </div>
            </div>

            {/* Delivery Progress Bar */}
            <div className="pt-2">
              <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1">
                <span>Order Confirmed</span>
                <span className="text-blue-600 dark:text-sky-400">In Transit</span>
                <span>Delivered</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-gradient-to-r from-blue-600 to-sky-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Wishlist Grid */}
      {activeTab === 'wishlist' && (
        <div className="space-y-4">
          {wishlist.length === 0 ? (
            <div className="glass-card rounded-3xl p-12 text-center space-y-3">
              <Heart className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Your wishlist is empty</p>
              <p className="text-xs text-slate-400">Save items from verified brand storefronts to track price drops!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((p) => (
                <div key={p.id} className="glass-card rounded-3xl p-4 border border-slate-200 dark:border-slate-800 space-y-3">
                  <img src={p.image} className="w-full h-40 object-cover rounded-2xl" />
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">{p.name}</h4>
                  <p className="text-base font-black text-blue-600 dark:text-sky-400">${p.price}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onAddToCart(p)}
                      className="flex-1 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs cursor-pointer"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => onRemoveWishlist(p)}
                      className="px-3 py-2 rounded-xl bg-rose-50 text-rose-600 font-bold text-xs cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
