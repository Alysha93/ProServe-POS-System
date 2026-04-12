import { useState, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { MenuItem } from '../components/pos/MenuItem';
import { OrderPanel } from '../components/pos/OrderPanel';
import { CategoryTabs } from '../components/pos/CategoryTabs';

export default function POSPage() {
  const { menu, categories, addToCart, sendOrderToKitchen } = useAppStore();
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMenu = menu.filter(item => {
    const matchesCategory = activeCategoryId ? item.categoryId === activeCategoryId : true;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Keyboard shortcut listener (Speed Mode)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input (not used yet, but good practice)
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'Enter') {
        e.preventDefault();
        // Use the store's current state to verify if cart is empty before sending
        if (useAppStore.getState().cart.length > 0) {
           sendOrderToKitchen();
        }
      }

      // Numbers 1-9
      const num = parseInt(e.key);
      if (!isNaN(num) && num > 0 && num <= 9) {
        e.preventDefault();
        const itemToAdd = filteredMenu[num - 1];
        if (itemToAdd) addToCart(itemToAdd);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredMenu, addToCart, sendOrderToKitchen]);


  return (
    <div className="flex h-full w-full gap-6">
      <div className="flex-1 flex flex-col min-w-0">
        <header className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
          <div>
            <h1 className="text-3xl font-bold text-text-main tracking-tight">Menu</h1>
            <p className="text-subtext text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
          </div>
          
          <div className="relative w-full sm:w-64">
            <input 
              type="text" 
              placeholder="Search dishes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-white/5 rounded-xl px-4 py-2.5 text-text-main focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-subtext hover:text-text-main"
              >
                ✕
              </button>
            )}
          </div>
        </header>
        
        <CategoryTabs 
          categories={categories} 
          activeCategoryId={activeCategoryId} 
          onSelect={setActiveCategoryId} 
        />
        
        <div className="flex-1 overflow-y-auto pb-6 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMenu.map(item => (
              <MenuItem key={item.id} item={item} onAdd={() => addToCart(item)} />
            ))}
          </div>
        </div>
      </div>
      
      <OrderPanel />
    </div>
  );
}

