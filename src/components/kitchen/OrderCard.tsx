import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Order } from '../../store/useAppStore';

interface Props {
  order: Order;
  onStatusChange: (id: string, status: Order['status']) => void;
}

export function OrderCard({ order, onStatusChange }: Props) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    // calculate elapsed time in seconds
    const elapsed = Math.floor((Date.now() - order.createdAt) / 1000);
    setTime(elapsed);

    const interval = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [order.createdAt]);

  const mins = Math.floor(time / 60);
  const secs = time % 60;
  const isLate = mins >= 10; // Red text if waiting more than 10 mins

  const handleNextStatus = () => {
    if (order.status === 'new') onStatusChange(order.id, 'preparing');
    else if (order.status === 'preparing') onStatusChange(order.id, 'ready');
    else onStatusChange(order.id, 'completed');
  };

  const statusMap = {
    new: { text: 'Start Prep', color: 'bg-accent text-black', border: 'border-accent/40' },
    preparing: { text: 'Mark Ready', color: 'bg-blue-500 text-white', border: 'border-blue-500/40' },
    ready: { text: 'Complete Order', color: 'bg-emerald-500 text-white', border: 'border-emerald-500/40' },
    completed: { text: 'Done', color: '', border: '' }
  };
  
  const currentStatus = statusMap[order.status];

  const urgencyBorder = time > 300 ? "border-l-danger border-white/10" :
                        time > 120 ? "border-l-yellow-500 border-white/10" :
                                     "border-l-accent border-white/10";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className={`bg-white/5 border-l-4 border-t border-r border-b ${urgencyBorder} rounded-2xl p-4 shadow-xl backdrop-blur flex flex-col hover:border-white/20 hover:scale-[1.02] active:scale-[0.97] transition-all duration-200`}
    >
      <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-text-main">#{order.id}</span>
          {order.tableId && (
            <span className="px-2 py-0.5 rounded-full bg-border text-xs font-semibold">Table {order.tableId}</span>
          )}
        </div>
        <div className={`text-sm tracking-widest font-mono ${isLate ? 'text-danger font-bold' : 'text-subtext'}`}>
          ⏱ {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
        </div>
      </div>

      <ul className="text-text-main space-y-2 mb-6 flex-1 text-sm">
        {order.items.map((item, i) => (
          <li key={i} className="flex justify-between">
            <span className="font-medium"><span className="text-accent">{item.quantity}x</span> {item.name}</span>
            {item.notes && <span className="text-xs text-subtext italic block ml-5">Note: {item.notes}</span>}
          </li>
        ))}
      </ul>

      {order.status !== 'completed' && (
        <button 
          onClick={handleNextStatus}
          className={`w-full py-2.5 rounded-xl font-bold transition-all duration-200 active:scale-95 ${currentStatus.color}`}
        >
          {currentStatus.text}
        </button>
      )}
    </motion.div>
  );
}
