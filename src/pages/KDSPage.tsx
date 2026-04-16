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
      color: 'text-slate-400',
      badge: 'bg-slate-800 text-slate-400',
      glow: 'from-slate-400/5',
    },
    {
      label: 'In Progress',
      orders: prepOrders,
      color: 'text-secondary',
      badge: 'bg-secondary/20 text-secondary',
      glow: 'from-secondary/5',
    },
    {
      label: 'Dispatch Ready',
      orders: readyOrders,
      color: 'text-accent',
      badge: 'bg-accent/20 text-accent',
      glow: 'from-accent/5',
    },
  ];

  return (
    <div className="flex-1 overflow-auto p-10 h-full flex flex-col bg-slate-950/20">
      {/* Header */}
      <header className="flex items-center justify-between mb-12 shrink-0">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter">Kitchen Control</h1>
          <p className="text-slate-500 font-medium mt-1 uppercase text-xs tracking-widest">
            Live Production © <span className="text-accent font-black">{totalActive} Pending Tickets</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Live indicator */}
          <div className="flex items-center gap-3 bg-slate-900/50 px-5 py-2.5 border border-white/5 rounded-2xl backdrop-blur-xl shadow-xl">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
            </span>
            <span className="text-xs font-black uppercase tracking-widest text-white">Ops Link Active</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-accent text-slate-950 flex items-center justify-center shadow-lg shadow-accent/20">
            <Zap className="w-6 h-6" />
          </div>
        </div>
      </header>

      {/* 3-Column Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 flex-1 min-h-0 pb-10">
        {columns.map(col => (
          <div
            key={col.label}
            className={`bg-slate-900/40 rounded-[2.5rem] border border-white/5 flex flex-col overflow-hidden shadow-2xl backdrop-blur-xl relative`}
          >
            {/* Column header */}
            <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center shrink-0">
              <span className={`font-black text-xs tracking-[0.2em] uppercase ${col.color}`}>
                {col.label}
              </span>
              <motion.span
                key={col.orders.length}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`${col.badge} text-[10px] font-black px-3 py-1.5 rounded-xl border border-white/5`}
              >
                {col.orders.length.toString().padStart(2, '0')}
              </motion.span>
            </div>

            {/* Orders list */}
            <div className="p-6 flex-1 overflow-y-auto no-scrollbar space-y-6">
              {col.orders.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-slate-700 opacity-20 py-20 pointer-events-none">
                  <div className="text-6xl mb-6">🍵</div>
                  <p className="text-xs font-black uppercase tracking-widest">Clear Queue</p>
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

            {/* Decorative bottom glow */}
            <div className={`absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t ${col.glow} to-transparent pointer-events-none opacity-20`} />
          </div>
        ))}
      </div>
    </div>
  );
}
