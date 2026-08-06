import React from 'react';
import type { Product, Brand } from '../types';
import { 
  TrendingUp, DollarSign, Package, ShoppingBag, 
  Users, Plus, Edit, BarChart3, ShieldCheck 
} from 'lucide-react';

interface BrandDashboardProps {
  products: Product[];
  brands: Brand[];
  onAddNewProduct: (newProd: Partial<Product>) => void;
}

export const BrandDashboard: React.FC<BrandDashboardProps> = ({
  products,
  onAddNewProduct
}) => {
  const [activeTab, setActiveTab] = React.useState<'overview' | 'products' | 'orders'>('overview');
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  // Form State
  const [newProdName, setNewProdName] = React.useState('');
  const [newProdPrice, setNewProdPrice] = React.useState('');
  const [newProdCategory, setNewProdCategory] = React.useState('electronics');
  const [newProdImage, setNewProdImage] = React.useState('');

  const brandProducts = products.filter(p => p.brandId === 'apple' || p.brandId === 'nike');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;
    onAddNewProduct({
      name: newProdName,
      price: parseFloat(newProdPrice),
      category: newProdCategory,
      image: newProdImage || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      brandId: 'apple',
      brandName: 'Apple Inc.',
      brandLogo: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=150&q=80',
      rating: 5.0,
      reviewCount: 1,
      inStock: true,
      stockQuantity: 50,
      specifications: { 'Seller': 'Apple Verified Store' },
      colors: ['Silver', 'Space Gray'],
      warranty: '1 Year Manufacturer Warranty'
    });
    setIsAddModalOpen(false);
    setNewProdName('');
    setNewProdPrice('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Profile Section */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-5">
          <img
            src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=150&q=80"
            alt="Apple logo"
            className="w-20 h-20 rounded-2xl object-cover shadow-lg border border-slate-100 dark:border-slate-800"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">Apple Flagship Merchant</h1>
              <span className="bg-sky-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Verified Partner
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Cupertino, California • Store ID: #BRD-99824</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-lg shadow-blue-500/25 flex items-center gap-2 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add New Listing
          </button>
        </div>
      </div>

      {/* Analytics KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-blue-600 dark:text-sky-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Monthly Revenue</span>
            <DollarSign className="w-5 h-5" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">$142,850.00</p>
          <span className="text-[11px] text-emerald-500 font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +18.4% vs last month
          </span>
        </div>

        <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-indigo-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Orders</span>
            <ShoppingBag className="w-5 h-5" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">1,480</p>
          <span className="text-[11px] text-emerald-500 font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +12.1% growth
          </span>
        </div>

        <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-sky-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Listings</span>
            <Package className="w-5 h-5" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{brandProducts.length + 140}</p>
          <span className="text-[11px] text-slate-400 font-medium">98.5% In Stock</span>
        </div>

        <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-amber-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Store Followers</span>
            <Users className="w-5 h-5" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">48,900</p>
          <span className="text-[11px] text-emerald-500 font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +2,300 new this week
          </span>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex items-center border-b border-slate-200 dark:border-slate-800 space-x-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 font-bold text-sm transition relative cursor-pointer ${
            activeTab === 'overview' ? 'text-blue-600 dark:text-sky-400' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Analytics & Sales Report
          {activeTab === 'overview' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></span>}
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 font-bold text-sm transition relative cursor-pointer ${
            activeTab === 'products' ? 'text-blue-600 dark:text-sky-400' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Manage Catalog Products
          {activeTab === 'products' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></span>}
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 font-bold text-sm transition relative cursor-pointer ${
            activeTab === 'orders' ? 'text-blue-600 dark:text-sky-400' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Customer Orders
          {activeTab === 'orders' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></span>}
        </button>
      </div>

      {/* Tab 1: Overview Chart Simulation */}
      {activeTab === 'overview' && (
        <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-500" /> Live Revenue Performance
            </h3>
            <span className="text-xs text-slate-400 font-semibold">Real-time sync</span>
          </div>

          {/* Bar Visualizer */}
          <div className="h-64 flex items-end justify-between gap-4 pt-10 px-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            {[
              { month: 'Jan', val: 65 },
              { month: 'Feb', val: 80 },
              { month: 'Mar', val: 55 },
              { month: 'Apr', val: 90 },
              { month: 'May', val: 75 },
              { month: 'Jun', val: 95 },
              { month: 'Jul', val: 110 },
              { month: 'Aug', val: 130 }
            ].map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                <div 
                  className="w-full bg-gradient-to-t from-blue-600 to-sky-400 rounded-t-xl transition-all duration-500 group-hover:opacity-80"
                  style={{ height: `${(item.val / 140) * 100}%` }}
                ></div>
                <span className="text-[11px] font-bold text-slate-500">{item.month}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Products Listing */}
      {activeTab === 'products' && (
        <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">Active Store Listings</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-semibold">
                  <th className="p-3">Product</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3 flex items-center gap-3">
                      <img src={p.image} className="w-10 h-10 rounded-lg object-cover" />
                      <span className="font-bold text-slate-900 dark:text-white">{p.name}</span>
                    </td>
                    <td className="p-3 font-black text-slate-900 dark:text-white">${p.price}</td>
                    <td className="p-3 uppercase text-slate-500 font-semibold">{p.category}</td>
                    <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{p.stockQuantity} units</td>
                    <td className="p-3">
                      <span className="bg-emerald-500/10 text-emerald-600 font-bold px-2 py-0.5 rounded-md">Live</span>
                    </td>
                    <td className="p-3">
                      <button className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card rounded-3xl p-6 max-w-lg w-full border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Add Product to Storefront</h3>
            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apple Watch Ultra 2"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Price ($ USD)</label>
                <input
                  type="number"
                  required
                  placeholder="799"
                  value={newProdPrice}
                  onChange={(e) => setNewProdPrice(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Category</label>
                <select
                  value={newProdCategory}
                  onChange={(e) => setNewProdCategory(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium"
                >
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="sports">Sports</option>
                  <option value="beauty">Beauty</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newProdImage}
                  onChange={(e) => setNewProdImage(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-slate-600 dark:text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold shadow-lg cursor-pointer"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
