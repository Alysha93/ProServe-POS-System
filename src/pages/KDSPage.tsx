import { useAppStore } from '../store/useAppStore';
import { OrderCard } from '../components/kitchen/OrderCard';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { Zap } from 'lucide-react';

export default function KDSPage() {
  const { activeOrders, updateOrderStatus, sendOrderToKitchen, addToCart, menu } = useAppStore();

  const newOrders = activeOrders.filter(o => o.status === 'new');
  const prepOrders = activeOrders.filter(o => o.status === 'preparing');
  const readyOrders = activeOrders.filter(o => o.status === 'ready');
  const totalActive = newOrders.length + prepOrders.length + readyOrders.length;

  // Inject fake incoming orders for live demo feel
  useEffect(() => {
    const interval = setInterval(() => {
      addToCart(menu[Math.floor(Math.random() * 6)]);
      addToCart(menu[Math.floor(Math.random() * menu.length)]);
      sendOrderToKitchen();
    }, 20000);
    return () => clearInterval(interval);
  }, [addToCart, sendOrderToKitchen, menu]);

  const columns = [
    {
      label: 'Incoming',
      orders: newOrders,
      color: 'text-accent',
      badge: 'bg-accent/20 text-accent',
      glow: 'from-accent/5',
    },
    {
      label: 'In Progress',
      orders: prepOrders,
      color: 'text-blue-400',
      badge: 'bg-blue-500/20 text-blue-400',
      glow: 'from-blue-500/5',
    },
    {
      label: 'Ready for Pickup',
      orders: readyOrders,
      color: 'text-emerald-400',
      badge: 'bg-emerald-500/20 text-emerald-400',
      glow: 'from-emerald-500/5',
    },
  ];

  return (
    <div className="flex-1 overflow-auto p-6 h-full flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between mb-8 shrink-0">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Kitchen Display</h1>
          <p className="text-subtext text-sm mt-0.5">
            Live order management · <span className="text-accent font-semibold">{totalActive} active order{totalActive !== 1 ? 's' : ''}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Live indicator */}
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 border border-white/10 rounded-2xl backdrop-blur">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-sm font-semibold text-white">System Live</span>
          </div>
          {/* Urgency legend */}
          <div className="hidden lg:flex items-center gap-3 text-xs text-subtext bg-white/5 px-4 py-2 border border-white/10 rounded-2xl">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> &lt;2m</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-500 inline-block" /> 2–5m</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> &gt;5m</span>
          </div>
          <Zap className="w-5 h-5 text-accent" />
        </div>
      </header>

      {/* 3-Column Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0 pb-6">
        {columns.map(col => (
          <div
            key={col.label}
            className={`bg-gradient-to-b ${col.glow} to-transparent bg-white/[0.02] rounded-2xl border border-white/5 flex flex-col overflow-hidden shadow-xl backdrop-blur`}
          >
            {/* Column header */}
            <div className="px-5 py-4 border-b border-white/5 flex justify-between items-center flex-shrink-0">
              <span className={`font-black text-sm tracking-widest uppercase ${col.color}`}>
                {col.label}
              </span>
              <motion.span
                key={col.orders.length}
                initial={{ scale: 1.4 }}
                animate={{ scale: 1 }}
                className={`${col.badge} text-xs font-black px-2.5 py-1 rounded-full`}
              >
                {col.orders.length}
              </motion.span>
            </div>

            {/* Orders list */}
            <div className="p-4 flex-1 overflow-y-auto custom-scrollbar space-y-4">
              {col.orders.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-subtext/40 py-16">
                  <div className="text-4xl mb-3">🍳</div>
                  <p className="text-sm font-medium">Nothing here</p>
                </div>
              )}
              <AnimatePresence mode="popLayout">
                {col.orders.map(order => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onStatusChange={updateOrderStatus}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
