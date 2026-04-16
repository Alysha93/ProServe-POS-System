import { useState, useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import { MenuItem } from '../components/pos/MenuItem';
import { Search, ShoppingBag, X, Trash2, Plus, Minus, Printer, Ban } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export default function TakeoutPage() {
  const { 
    menu, 
    categories, 
    cart, 
    addToCart, 
    removeFromCart, 
    updateCartItemQuantity, 
    clearCart, 
    sendOrderToKitchen,
    voidCartItem,
    discountPercent,
    applyDiscount,
    isClockedIn
  } = useAppStore();
  const [promoCode, setPromoCode] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id || 'all');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filteredMenu = useMemo(() => {
    return menu.filter(item => {
      const matchesCategory = activeCategoryId === 'all' ? true : item.categoryId === activeCategoryId;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [menu, activeCategoryId, searchQuery]);

  const cartTotal = cart.reduce((sum, item) => sum + (item.isVoided ? 0 : item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + (item.isVoided ? 0 : item.quantity), 0);
  const discountAmount = cartTotal * (discountPercent / 100);
  const finalTotal = (cartTotal - discountAmount) * 1.08; // Total with tax and discount

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'PROSERVE10') {
      applyDiscount(10);
    } else if (promoCode.toUpperCase() === 'ELITE20') {
      applyDiscount(20);
    } else {
      alert('Invalid Promo Code');
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-full bg-[#060b19] font-inter relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-[-10%] left-[-5%] blur-[120px] opacity-20 bg-accent w-[500px] h-[500px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] blur-[120px] opacity-10 bg-secondary w-[600px] h-[600px] rounded-full pointer-events-none" />

      {/* Header & Search */}
      <header className="px-6 pt-8 pb-4 space-y-4 shrink-0 relative z-10">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-sm font-black text-accent uppercase tracking-[0.3em] mb-1">Pick up & Go</h1>
            <h2 className="text-6xl font-black text-white tracking-tighter uppercase italic leading-none">
              {activeCategoryId === 'all' ? 'The Menu' : categories.find(c => c.id === activeCategoryId)?.name}
            </h2>
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-subtext text-xs uppercase tracking-widest">Available Items</p>
            <p className="text-2xl font-black text-white italic tracking-tighter">{filteredMenu.length}</p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-accent/20 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-subtext w-6 h-6 z-10" />
          <input 
            type="text" 
            placeholder="Search our kitchen..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-[2rem] pl-14 pr-6 py-5 text-xl text-white placeholder:text-subtext/40 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-white/10 backdrop-blur-2xl transition-all shadow-2xl relative z-10"
          />
        </div>
      </header>

      {/* Category Scrollbar */}
      <div className="px-6 mb-6 shrink-0 relative z-10">
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory">
          <button
            onClick={() => setActiveCategoryId('all')}
            className={twMerge(clsx(
              "px-8 py-3 rounded-2xl text-[13px] font-black uppercase tracking-widest transition-all snap-start border",
              activeCategoryId === 'all' 
                ? "bg-accent border-accent text-black shadow-[0_10px_30px_rgba(219,39,119,0.3)] scale-105" 
                : "bg-white/5 border-white/5 text-subtext hover:bg-white/10 hover:border-white/20"
            ))}
          >
            All Items
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={twMerge(clsx(
                "px-8 py-3 rounded-2xl text-[13px] font-black uppercase tracking-widest transition-all snap-start border",
                activeCategoryId === cat.id 
                  ? "bg-secondary border-secondary text-white shadow-[0_10px_30_rgba(139,92,246,0.3)] scale-105" 
                  : "bg-white/5 border-white/5 text-subtext hover:bg-white/10 hover:border-white/20"
              ))}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Hero Banner */}
      <div className="px-6 mb-10 shrink-0 relative z-10 h-32 md:h-40">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategoryId}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full h-full rounded-[2rem] overflow-hidden relative shadow-2xl border border-white/5"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img 
                src={
                  activeCategoryId === 'mains' ? '/images/burger.png' :
                  activeCategoryId === 'pizza' ? '/images/pizza.png' :
                  activeCategoryId === 'salads' ? '/images/salad.png' :
                  activeCategoryId === 'soft-drinks' ? '/images/drinks.png' :
                  activeCategoryId === 'sides' ? '/images/sides.png' :
                  activeCategoryId === 'street-food' ? '/images/street_food.png' :
                  activeCategoryId === 'desserts' ? '/images/desserts.png' :
                  activeCategoryId === 'hot-drinks' ? '/images/hot_drinks.png' :
                  activeCategoryId === 'specialty' ? '/images/specialty.png' :
                  '/images/burger.png'
                } 
                className="w-full h-full object-cover grayscale-[0.3] opacity-50"
                alt="Category Banner"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#060b19] via-[#060b19]/80 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center px-10">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-2">Today's Selection</h3>
                <h4 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">
                  {
                    activeCategoryId === 'all' ? 'The Full Menu' :
                    activeCategoryId === 'mains' ? 'Gourmet Mains' :
                    activeCategoryId === 'pizza' ? 'Stone Oven' :
                    activeCategoryId === 'salads' ? 'Fresh Greens' :
                    activeCategoryId === 'soft-drinks' ? 'Ice Cold' :
                    activeCategoryId === 'sides' ? 'Crispy Sides' :
                    activeCategoryId === 'street-food' ? 'Street Food' :
                    activeCategoryId === 'desserts' ? 'Sweet Treats' :
                    activeCategoryId === 'hot-drinks' ? 'Hot Roasts' :
                    activeCategoryId === 'specialty' ? 'Our Best' :
                    'Chef\'s Special'
                  }
                </h4>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Menu Grid Container */}
      <div className="flex-1 min-h-0 relative z-10">
        <div className="h-full overflow-y-auto px-6 pb-40 custom-scrollbar scroll-smooth">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            <AnimatePresence mode='popLayout'>
              {filteredMenu.map(item => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <MenuItem item={item} onAdd={() => addToCart(item)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Cart Drawer Toggle (Mobile Floating) or Bottom Bar */}
      <motion.div 
        className="absolute bottom-6 left-6 right-6 z-40 lg:hidden"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
      >
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="w-full bg-accent text-black font-black py-5 rounded-2xl shadow-[0_10px_40px_rgba(219,39,119,0.4)] flex items-center justify-between px-8 group active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingBag className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            </div>
            <span className="text-xl uppercase tracking-tighter italic">View Order</span>
          </div>
          <span className="text-2xl">${cartTotal.toFixed(2)}</span>
        </button>
      </motion.div>

      {/* Cart Drawer Overlay */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 max-h-[90vh] bg-card rounded-t-[3rem] border-t border-white/10 z-50 lg:hidden flex flex-col"
            >
              <div className="p-8 flex-1 overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-4">
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">Your Order</h2>
                    <button 
                      onClick={handlePrintReceipt}
                      className="p-3 bg-white/5 rounded-2xl text-subtext hover:text-white transition-all active:scale-95"
                    >
                      <Printer className="w-6 h-6" />
                    </button>
                  </div>
                  <button onClick={() => setIsDrawerOpen(false)} className="bg-white/5 p-3 rounded-full text-subtext">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-20 opacity-30">
                    <ShoppingBag className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-xl">Hungry? Add something!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map(item => (
                      <div key={item.cartItemId} className={twMerge(clsx(
                        "flex flex-col gap-4 bg-white/5 p-6 rounded-3xl border border-white/5 transition-all",
                        item.isVoided && "opacity-40 grayscale blur-[0.5px] border-danger/20"
                      ))}>
                        <div className="flex justify-between items-start">
                          <div className="relative">
                            <h3 className="text-xl font-bold">{item.name}</h3>
                            <p className="text-accent font-bold">${item.price.toFixed(2)}</p>
                            {item.isVoided && (
                              <div className="absolute top-1/2 left-0 right-0 h-1 bg-danger -rotate-3 rounded-full" />
                            )}
                          </div>
                          <div className="flex gap-2">
                             <button 
                                onClick={() => voidCartItem(item.cartItemId)}
                                title="Void Item"
                                className={twMerge(clsx(
                                  "p-2 rounded-xl transition-all",
                                  item.isVoided ? "bg-danger text-white" : "bg-white/5 text-subtext hover:text-danger"
                                ))}
                              >
                                <Ban className="w-5 h-5" />
                              </button>
                              <button 
                                onClick={() => removeFromCart(item.cartItemId)}
                                className="bg-white/5 p-2 rounded-xl text-subtext hover:text-danger"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <button 
                            onClick={() => updateCartItemQuantity(item.cartItemId, -1)}
                            className="w-12 h-12 rounded-2xl bg-bg border border-white/5 flex items-center justify-center text-white active:scale-90"
                          >
                            <Minus className="w-6 h-6" />
                          </button>
                          <span className="text-2xl font-black">{item.quantity}</span>
                          <button 
                            onClick={() => updateCartItemQuantity(item.cartItemId, 1)}
                            className="w-12 h-12 rounded-2xl bg-bg border border-white/5 flex items-center justify-center text-white active:scale-90"
                          >
                            <Plus className="w-6 h-6" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-8 bg-bg border-t border-white/5 space-y-6">
                {cart.length > 0 && (
                  <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="Enter Promo Code" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white placeholder:text-subtext/40 focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                    />
                    <button 
                      onClick={handleApplyPromo}
                      className="absolute right-2 top-2 bottom-2 px-4 bg-accent text-black text-[11px] font-black uppercase rounded-xl hover:bg-accent-soft active:scale-95 transition-all"
                    >
                      Apply
                    </button>
                  </div>
                )}
                
                <div className="space-y-2">
                  <div className="flex justify-between text-subtext text-sm">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-success text-sm font-bold">
                      <span>Discount ({discountPercent}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-white text-3xl font-black italic uppercase">
                    <span>Total</span>
                    <span className="text-accent">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => { clearCart(); setIsDrawerOpen(false); }}
                    className="flex-1 py-5 rounded-2xl bg-white/5 text-subtext font-bold uppercase tracking-widest text-sm"
                  >
                    Clear
                  </button>
                  <button 
                    onClick={() => { sendOrderToKitchen(); setIsDrawerOpen(false); }}
                    className="flex-[2] py-5 rounded-2xl bg-accent text-black font-black uppercase tracking-tighter text-xl italic"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Cart Aside */}
      <aside className="hidden lg:flex w-96 shrink-0 flex-col border-l border-white/5 p-6 bg-card/30 backdrop-blur-md">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40">Current Order</h2>
          <button 
            onClick={handlePrintReceipt}
            className="p-2 bg-white/5 rounded-xl text-subtext hover:text-white transition-all active:scale-95"
          >
            <Printer className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {cart.map(item => (
            <div key={item.cartItemId} className={twMerge(clsx(
              "bg-white/5 p-4 rounded-2xl border border-white/5 group hover:border-accent/30 transition-all relative overflow-hidden",
              item.isVoided && "opacity-40 grayscale border-danger/20"
            ))}>
               <div className="flex justify-between items-start mb-3">
                 <div className="relative">
                   <div className="font-bold text-lg">{item.name}</div>
                   {item.isVoided && <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-danger -rotate-2" />}
                 </div>
                 <div className="flex gap-2">
                    <button 
                      onClick={() => voidCartItem(item.cartItemId)}
                      className={twMerge(clsx(
                        "opacity-0 group-hover:opacity-100 transition-all",
                        item.isVoided ? "text-danger" : "text-subtext hover:text-danger"
                      ))}
                    >
                      <Ban className="w-4 h-4" />
                    </button>
                    <button onClick={() => removeFromCart(item.cartItemId)} className="opacity-0 group-hover:opacity-100 text-subtext transition-all hover:text-danger">
                      <Trash2 className="w-4 h-4" />
                    </button>
                 </div>
               </div>
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <button onClick={() => updateCartItemQuantity(item.cartItemId, -1)} className="w-8 h-8 rounded-lg bg-bg border border-white/5 flex items-center justify-center hover:bg-white/10 active:scale-95"><Minus className="w-4 h-4" /></button>
                    <span className="font-bold w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateCartItemQuantity(item.cartItemId, 1)} className="w-8 h-8 rounded-lg bg-bg border border-white/5 flex items-center justify-center hover:bg-white/10 active:scale-95"><Plus className="w-4 h-4" /></button>
                 </div>
                 <div className="font-black text-accent">${(item.price * item.quantity).toFixed(2)}</div>
               </div>
            </div>
          ))}
          {cart.length === 0 && <div className="text-center py-20 text-subtext italic">Your cart is empty.</div>}
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 space-y-6">
          {cart.length > 0 && (
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Promo Code" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <button 
                onClick={handleApplyPromo}
                className="absolute right-2 top-2 bottom-2 px-3 bg-accent text-black text-[10px] font-black uppercase rounded-lg"
              >
                Apply
              </button>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex justify-between text-subtext text-xs uppercase tracking-widest">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-success text-xs font-bold uppercase tracking-widest">
                <span>Discount</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-2xl font-black italic uppercase">
              <span>Total</span>
              <span className="text-accent">${finalTotal.toFixed(2)}</span>
            </div>
          </div>
          
          <button 
            disabled={cart.length === 0 || !isClockedIn}
            onClick={sendOrderToKitchen}
            className="w-full bg-accent hover:bg-accent-soft text-black font-black py-5 rounded-2xl transition-all shadow-[0_10px_30px_rgba(219,39,119,0.2)] uppercase tracking-tighter italic text-xl disabled:opacity-50 disabled:grayscale"
          >
            {isClockedIn ? 'Place Order' : 'Clock In to Order'}
          </button>
        </div>
      </aside>
    </div>
  );
}
