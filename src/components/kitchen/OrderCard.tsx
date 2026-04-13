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
    const elapsed = Math.floor((Date.now() - order.createdAt) / 1000);
    setTime(elapsed);
    const interval = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [order.createdAt]);

  const mins = Math.floor(time / 60);
  const secs = time % 60;
  const isLate = mins >= 10;

  const handleNextStatus = () => {
    if (order.status === 'new') onStatusChange(order.id, 'preparing');
    else if (order.status === 'preparing') onStatusChange(order.id, 'ready');
    else onStatusChange(order.id, 'completed');
  };

  const statusMap = {
    new: { text: 'Start Prep →', color: 'bg-accent text-black', border: 'border-accent/40' },
    preparing: { text: 'Mark Ready →', color: 'bg-blue-500 text-white', border: 'border-blue-500/40' },
    ready: { text: 'Complete ✓', color: 'bg-emerald-500 text-white', border: 'border-emerald-500/40' },
    completed: { text: 'Done', color: '', border: '' }
  };

  const currentStatus = statusMap[order.status];

  // Urgency system: green < 2min, yellow 2-5min, red > 5min
  const urgencyLevel = time > 300 ? 'red' : time > 120 ? 'yellow' : 'green';

  const urgencyConfig = {
    green: {
      border: 'border-l-emerald-500',
      glow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]',
      dot: 'bg-emerald-500',
      time: 'text-emerald-400',
      pulse: false,
    },
    yellow: {
      border: 'border-l-yellow-500',
      glow: 'shadow-[0_0_20px_rgba(234,179,8,0.2)]',
      dot: 'bg-yellow-500',
      time: 'text-yellow-400',
      pulse: true,
    },
    red: {
      border: 'border-l-red-500',
      glow: 'shadow-[0_0_25px_rgba(239,68,68,0.25)]',
      dot: 'bg-red-500',
      time: 'text-red-400',
      pulse: true,
    }
  };

  const u = urgencyConfig[urgencyLevel];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`
        bg-white/5 border-l-4 border-t border-r border-b border-white/10
        ${u.border} ${u.glow}
        rounded-2xl p-4 backdrop-blur-md flex flex-col
        hover:border-white/20 hover:scale-[1.02] active:scale-[0.97]
        transition-all duration-200 cursor-default
      `}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2.5">
          {/* Live pulse dot */}
          <span className="relative flex h-2.5 w-2.5">
            {u.pulse && (
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${u.dot} opacity-75`} />
            )}
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${u.dot}`} />
          </span>
          <span className="font-bold text-base text-text-main tracking-wide">
            #{order.id}
          </span>
          {order.tableId && (
            <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs font-semibold text-subtext">
              Table {order.tableId}
            </span>
          )}
        </div>
        {/* Live timer */}
        <div className={`text-sm tracking-widest font-mono font-bold ${u.time} ${isLate ? 'animate-pulse' : ''}`}>
          ⏱ {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
        </div>
      </div>

      {/* Items list */}
      <ul className="text-text-main space-y-2 mb-5 flex-1 text-sm">
        {order.items.filter(i => !i.isVoided).map((item, i) => (
          <li key={i} className="flex justify-between items-start">
            <span className="font-medium">
              <span className="text-accent font-black">{item.quantity}×</span>{' '}
              {item.name}
            </span>
            {item.notes && (
              <span className="text-[11px] text-subtext italic ml-4 text-right max-w-[120px]">
                {item.notes}
              </span>
            )}
          </li>
        ))}
      </ul>

      {/* Total */}
      <div className="text-xs text-subtext/60 mb-3 text-right font-mono">
        ${order.total.toFixed(2)} · {order.items.filter(i => !i.isVoided).reduce((s, i) => s + i.quantity, 0)} items
      </div>

      {/* Action button */}
      {order.status !== 'completed' && (
        <button
          onClick={handleNextStatus}
          className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all duration-200 active:scale-95 hover:opacity-90 ${currentStatus.color}`}
        >
          {currentStatus.text}
        </button>
      )}
    </motion.div>
  );
}
