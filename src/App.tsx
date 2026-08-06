import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BrandStorePage } from './components/BrandStorePage';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductComparison } from './components/ProductComparison';
import { BrandDashboard } from './components/BrandDashboard';
import { CustomerDashboard } from './components/CustomerDashboard';
import { AiShoppingHub } from './components/AiShoppingHub';
import { QuickViewModal } from './components/QuickViewModal';
import { OffersSection } from './components/OffersSection';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

import { BRANDS, PRODUCTS, CATEGORIES } from './mockData';
import type { Brand, Product, CartItem } from './types';
import { ShieldCheck } from 'lucide-react';

export function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currency, setCurrency] = useState<string>('USD');

  // Interactive Data States
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [brandsList] = useState<Brand[]>(BRANDS);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(BRANDS[0]);
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [compareItems, setCompareItems] = useState<Product[]>([]);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAiHubOpen, setIsAiHubOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sync Dark Mode Class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Cart Operations
  const handleAddToCart = (product: Product, color?: string, size?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, selectedColor: color, selectedSize: size }];
    });
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  // Wishlist Operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  // Compare Operations
  const handleToggleCompare = (product: Product) => {
    setCompareItems(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 4) {
        alert('You can compare up to 4 products side-by-side at a time.');
        return prev;
      }
      return [...prev, product];
    });
  };

  const handleAddNewProduct = (newProdData: Partial<Product>) => {
    const newProduct: Product = {
      id: `p-${Date.now()}`,
      name: newProdData.name || 'Untitled Item',
      brandId: newProdData.brandId || 'apple',
      brandName: newProdData.brandName || 'Apple',
      brandLogo: newProdData.brandLogo || '',
      price: newProdData.price || 99,
      rating: 5.0,
      reviewCount: 1,
      category: newProdData.category || 'electronics',
      image: newProdData.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      images: [newProdData.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'],
      inStock: true,
      stockQuantity: 50,
      description: 'Newly listed product on BrandHub Flagship Storefront.',
      specifications: newProdData.specifications || {},
      colors: newProdData.colors || ['Black'],
      warranty: newProdData.warranty || 'Standard Warranty'
    };
    setProductsList(prev => [newProduct, ...prev]);
    alert('Listing successfully created and published on BrandHub Marketplace!');
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      
      {/* Top Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeView={activeView}
        setActiveView={setActiveView}
        cart={cart}
        wishlist={wishlist}
        setIsCartOpen={setIsCartOpen}
        setIsWishlistOpen={() => setActiveView('customer-dashboard')}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currency={currency}
        setCurrency={setCurrency}
        onOpenAiChat={() => setIsAiHubOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'home' && (
          <HeroSection
            onExploreBrands={() => setActiveView('brands')}
            onListBrand={() => setActiveView('brand-dashboard')}
            categories={CATEGORIES}
            brands={brandsList}
            featuredProducts={productsList}
            onSelectBrand={(b) => { setSelectedBrand(b); setActiveView('brand-detail'); }}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={(p) => handleAddToCart(p)}
            onToggleWishlist={(p) => handleToggleWishlist(p)}
            wishlistIds={wishlist.map(w => w.id)}
          />
        )}

        {activeView === 'brands' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-blue-600 dark:text-sky-400 uppercase tracking-widest">Storefront Directory</span>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white">Verified Brand Storefronts</h1>
              <p className="text-xs text-slate-500">Every brand operates its own official storefront with live stock guarantees.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {brandsList.map((brand) => (
                <div
                  key={brand.id}
                  onClick={() => { setSelectedBrand(brand); setActiveView('brand-detail'); }}
                  className="glass-card rounded-3xl overflow-hidden hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group border border-slate-200 dark:border-slate-800 shadow-lg"
                >
                  <div className="h-36 relative overflow-hidden bg-slate-900">
                    <img src={brand.coverImage} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                    {brand.verified && (
                      <span className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                        <ShieldCheck className="w-3 h-3" /> Verified Store
                      </span>
                    )}
                  </div>
                  <div className="p-6 relative pt-0">
                    <div className="-mt-10 mb-4 inline-block p-1 bg-white dark:bg-slate-900 rounded-2xl shadow-xl">
                      <img src={brand.logo} className="w-16 h-16 rounded-xl object-cover" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition">{brand.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{brand.description}</p>
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between text-xs font-bold text-blue-600 dark:text-sky-400">
                      <span>{brand.productCount} Products</span>
                      <span>Visit Storefront →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === 'brand-detail' && selectedBrand && (
          <BrandStorePage
            brand={selectedBrand}
            products={productsList}
            onBackToBrands={() => setActiveView('brands')}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={(p) => handleAddToCart(p)}
            onToggleWishlist={(p) => handleToggleWishlist(p)}
            wishlistIds={wishlist.map(w => w.id)}
          />
        )}

        {activeView === 'catalog' && (
          <ProductCatalog
            products={productsList}
            brands={brandsList}
            categories={CATEGORIES}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={(p) => handleAddToCart(p)}
            onToggleWishlist={(p) => handleToggleWishlist(p)}
            onToggleCompare={(p) => handleToggleCompare(p)}
            wishlistIds={wishlist.map(w => w.id)}
            compareIds={compareItems.map(c => c.id)}
          />
        )}

        {activeView === 'compare' && (
          <ProductComparison
            comparedProducts={compareItems}
            onRemoveCompare={(id) => setCompareItems(prev => prev.filter(p => p.id !== id))}
            onClearCompare={() => setCompareItems([])}
            onAddToCart={(p) => handleAddToCart(p)}
            onBrowseCatalog={() => setActiveView('catalog')}
          />
        )}

        {activeView === 'offers' && (
          <OffersSection
            products={productsList}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={(p) => handleAddToCart(p)}
            onToggleWishlist={(p) => handleToggleWishlist(p)}
            wishlistIds={wishlist.map(w => w.id)}
          />
        )}

        {activeView === 'brand-dashboard' && (
          <BrandDashboard
            products={productsList}
            brands={brandsList}
            onAddNewProduct={handleAddNewProduct}
          />
        )}

        {activeView === 'customer-dashboard' && (
          <CustomerDashboard
            wishlist={wishlist}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={(p) => handleAddToCart(p)}
            onRemoveWishlist={(p) => handleToggleWishlist(p)}
          />
        )}
      </main>

      {/* Floating Compare Bar Notice */}
      {compareItems.length > 0 && activeView !== 'compare' && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-4 border border-slate-700">
          <span className="text-xs font-bold">{compareItems.length} Products Selected for Comparison</span>
          <button
            onClick={() => setActiveView('compare')}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold transition cursor-pointer"
          >
            Compare Matrix →
          </button>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
      />

      {/* AI Assistant Modal */}
      <AiShoppingHub
        isOpen={isAiHubOpen}
        onClose={() => setIsAiHubOpen(false)}
        products={productsList}
        brands={brandsList}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlist.some(w => w.id === quickViewProduct.id) : false}
      />

      {/* Global Footer */}
      <Footer onNavigate={(v) => setActiveView(v)} />
    </div>
  );
}

export default App;
