import React from 'react';
import type { CartItem } from '../types';
import { X, Trash2, ShoppingBag, CreditCard } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem
}) => {
  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto border-l border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-600 dark:text-sky-400" />
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Your Bag ({cart.length})</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-900 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 my-4 space-y-4 overflow-y-auto pr-1">
          {cart.length === 0 ? (
            <div className="text-center py-20 space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Your bag is currently empty</p>
              <p className="text-xs text-slate-400">Discover items from verified flagship brand storefronts.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="flex gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                <img src={item.product.image} className="w-16 h-16 rounded-xl object-cover" />
                <div className="flex-1 space-y-1">
                  <span className="text-[10px] font-bold text-sky-500 uppercase">{item.product.brandName}</span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs line-clamp-1">{item.product.name}</h4>
                  <p className="font-black text-blue-600 dark:text-sky-400 text-xs">${item.product.price}</p>
                  
                  {/* Quantity Stepper */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-0.5 text-xs font-bold">
                      <button onClick={() => onUpdateQuantity(item.product.id, -1)} className="cursor-pointer">-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.product.id, 1)} className="cursor-pointer">+</button>
                    </div>
                    <button onClick={() => onRemoveItem(item.product.id)} className="text-rose-500 hover:text-rose-700 cursor-pointer">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout */}
        {cart.length > 0 && (
          <div className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-4">
            <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white">
              <span>Subtotal</span>
              <span className="text-blue-600 dark:text-sky-400 text-lg">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-[11px] text-slate-400">Taxes and free shipping calculated at checkout.</p>
            <button
              onClick={() => alert('Proceeding to Stripe Multi-Vendor Checkout simulation...')}
              className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <CreditCard className="w-4 h-4" /> Secure Stripe Checkout
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
