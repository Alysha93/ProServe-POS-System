import { useAppStore } from '../store/useAppStore';
import { OrderCard } from '../components/kitchen/OrderCard';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export default function KDSPage() {
  const { activeOrders, updateOrderStatus, sendOrderToKitchen, addToCart, menu } = useAppStore();

  const newOrders = activeOrders.filter(o => o.status === 'new');
  const prepOrders = activeOrders.filter(o => o.status === 'preparing');
  const readyOrders = activeOrders.filter(o => o.status === 'ready');

  // Inject fake incoming orders for the demo feel
  useEffect(() => {
    const interval = setInterval(() => {
      // simulate someone adding to cart and checking out
      addToCart(menu[0]);
      addToCart(menu[2]);
      sendOrderToKitchen();
    }, 15000); // every 15 seconds a fake order appears
    return () => clearInterval(interval);
  }, [addToCart, sendOrderToKitchen, menu]);

  return (
    <div className="flex-1 overflow-auto p-6 h-full flex flex-col">
      <header className="flex items-center justify-between mb-8 shrink-0">
        <h1 className="text-3xl font-bold text-text-main tracking-tight">Kitchen Display</h1>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-card px-4 py-2 border border-border rounded-xl">
            <span className="w-3 h-3 rounded-full bg-accent animate-pulse"></span>
            <span className="text-sm font-semibold text-text-main">System Online</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full pb-6">
        {/* NEW ORDERS COLUMN */}
        <div className="bg-card/40 rounded-2xl border border-white/5 flex flex-col overflow-hidden shadow-xl backdrop-blur">
          <div className="bg-card/80 p-5 border-b border-white/5 flex justify-between items-center backdrop-blur-md">
            <span className="font-semibold text-text-main text-lg tracking-wide uppercase">New Orders</span>
            <span className="bg-white/10 text-text-main text-sm font-bold px-3 py-1 rounded-full">{newOrders.length}</span>
          </div>
          <div className="p-5 flex-1 overflow-y-auto custom-scrollbar space-y-5">
            {newOrders.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-subtext opacity-60">
                <p className="text-lg">No active orders</p>
              </div>
            )}
            <AnimatePresence>
              {newOrders.map(order => (
                <OrderCard key={order.id} order={order} onStatusChange={updateOrderStatus} />
              ))}
            </AnimatePresence>
          </div>
        </div>
        
        {/* PREPARING COLUMN */}
        <div className="bg-card/40 rounded-2xl border border-white/5 flex flex-col overflow-hidden shadow-xl backdrop-blur">
          <div className="bg-card/80 p-5 border-b border-white/5 flex justify-between items-center backdrop-blur-md">
            <span className="font-semibold text-blue-400 text-lg tracking-wide uppercase">Preparing</span>
            <span className="bg-blue-500/20 text-blue-400 text-sm font-bold px-3 py-1 rounded-full">{prepOrders.length}</span>
          </div>
          <div className="p-5 flex-1 overflow-y-auto custom-scrollbar space-y-5">
            {prepOrders.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-subtext opacity-60">
                <p className="text-lg">Nothing in prep</p>
              </div>
            )}
            <AnimatePresence>
              {prepOrders.map(order => (
                <OrderCard key={order.id} order={order} onStatusChange={updateOrderStatus} />
              ))}
            </AnimatePresence>
          </div>
        </div>
        
        {/* READY COLUMN */}
        <div className="bg-card/40 rounded-2xl border border-white/5 flex flex-col overflow-hidden shadow-xl backdrop-blur">
          <div className="bg-card/80 p-5 border-b border-white/5 flex justify-between items-center backdrop-blur-md">
            <span className="font-semibold text-accent text-lg tracking-wide uppercase">Ready for Pickup</span>
            <span className="bg-accent/20 text-accent text-sm font-bold px-3 py-1 rounded-full">{readyOrders.length}</span>
          </div>
          <div className="p-5 flex-1 overflow-y-auto custom-scrollbar space-y-5">
            {readyOrders.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-subtext opacity-60">
                <p className="text-lg">No orders ready</p>
              </div>
            )}
            <AnimatePresence>
              {readyOrders.map(order => (
                <OrderCard key={order.id} order={order} onStatusChange={updateOrderStatus} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

