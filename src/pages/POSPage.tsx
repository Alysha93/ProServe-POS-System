import { useState, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { MenuItem } from '../components/pos/MenuItem';
import { OrderPanel } from '../components/pos/OrderPanel';
import { CategoryTabs } from '../components/pos/CategoryTabs';

export default function POSPage() {
  const { menu, categories, addToCart, sendOrderToKitchen, cart } = useAppStore();
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id);

  const filteredMenu = activeCategoryId 
    ? menu.filter(item => item.categoryId === activeCategoryId)
    : menu;

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
        <header className="mb-6 flex justify-between items-center shrink-0">
          <h1 className="text-3xl font-bold text-text-main tracking-tight">Menu</h1>
          <div className="text-subtext bg-card px-4 py-2 rounded-xl border border-border">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
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

