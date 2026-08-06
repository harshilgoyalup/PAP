import React from 'react';
import type { Product, Brand } from '../types';
import { 
  Bot, Send, Image as ImageIcon, 
  X, RefreshCw 
} from 'lucide-react';

interface AiShoppingHubProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  brands: Brand[];
  onSelectProduct: (product: Product) => void;
}

export const AiShoppingHub: React.FC<AiShoppingHubProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  const [messages, setMessages] = React.useState<Array<{ sender: 'ai' | 'user'; text: string; recommendedProducts?: Product[] }>>([
    {
      sender: 'ai',
      text: 'Hello! I am your AI Shopping Assistant. How can I help you discover verified brands today? You can ask me things like "Show me noise cancelling headphones under $400" or "What are trending running shoes from Nike?"'
    }
  ]);
  const [inputText, setInputText] = React.useState('');
  const [isVisualSearchActive, setIsVisualSearchActive] = React.useState(false);

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userQuery = inputText;
    setMessages(prev => [...prev, { sender: 'user', text: userQuery }]);
    setInputText('');

    // Simulate AI Intelligence lookup
    setTimeout(() => {
      const lower = userQuery.toLowerCase();
      let matched = products.filter(p => 
        p.name.toLowerCase().includes(lower) || 
        p.category.toLowerCase().includes(lower) || 
        p.brandName.toLowerCase().includes(lower)
      );

      if (matched.length === 0) {
        matched = products.slice(0, 2);
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `Based on your request "${userQuery}", I scanned over 500+ verified brand catalogs and found these top matches for you:`,
          recommendedProducts: matched.slice(0, 2)
        }
      ]);
    }, 800);
  };

  const handleSimulateVisualSearch = (_imageUrl: string) => {
    setIsVisualSearchActive(true);

    setTimeout(() => {
      setIsVisualSearchActive(false);
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: '⚡ Visual Image Recognition Analysis Complete! 98.4% Match found in Nike Flagship Store:',
          recommendedProducts: [products[1]]
        }
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-card rounded-3xl w-full max-w-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[600px] relative">
        
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm flex items-center gap-1.5">
                BrandHub AI Assistant
                <span className="bg-white/20 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">GPT-4o Vision</span>
              </h3>
              <p className="text-[10px] text-sky-100">Instant cross-brand recommendation & visual image search engine</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-2xl p-4 text-xs space-y-3 ${
                msg.sender === 'user' 
                  ? 'bg-blue-600 text-white font-medium rounded-br-none' 
                  : 'glass-card border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none shadow-md'
              }`}>
                <p>{msg.text}</p>

                {msg.recommendedProducts && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {msg.recommendedProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => { onSelectProduct(p); onClose(); }}
                        className="bg-white dark:bg-slate-900 rounded-2xl p-3 border border-slate-200 dark:border-slate-800 cursor-pointer hover:scale-105 transition space-y-1.5"
                      >
                        <img src={p.image} className="w-full h-24 object-cover rounded-xl" />
                        <span className="text-[10px] font-bold text-sky-500 uppercase">{p.brandName}</span>
                        <h5 className="font-bold text-slate-900 dark:text-white line-clamp-1">{p.name}</h5>
                        <p className="font-black text-blue-600 dark:text-sky-400">${p.price}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Visual Scanner Simulation State */}
          {isVisualSearchActive && (
            <div className="glass-card rounded-2xl p-4 text-center space-y-2 border border-sky-400 animate-pulse">
              <RefreshCw className="w-6 h-6 text-sky-500 animate-spin mx-auto" />
              <p className="text-xs font-bold text-sky-600 dark:text-sky-400">Analyzing image features across 500+ storefronts...</p>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <button
              type="button"
              onClick={() => handleSimulateVisualSearch('https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80')}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-800 transition cursor-pointer"
              title="Image Visual Search Scanner"
            >
              <ImageIcon className="w-4 h-4 text-sky-500" />
            </button>
            <input
              type="text"
              placeholder="Ask AI for product recommendations or specs..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center gap-1 hover:bg-blue-700 transition cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
