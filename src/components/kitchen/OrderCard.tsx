import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Clock } from 'lucide-react';
import type { Order } from '../../store/useAppStore';

interface Props {
  order: Order;
  onStatusChange: (id: string, status: Order['status']) => void;
}

export function OrderCard({ order, onStatusChange }: Props) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = order.createdAt;
    const interval = setInterval(() => {
      setElapsed(Date.now() - start);
    }, 1000);
    return () => clearInterval(interval);
  }, [order.createdAt]);

  const mins = Math.floor(elapsed / 60000);
  const secs = Math.floor((elapsed % 60000) / 1000);

  // Urgency logic
  const getUrgency = () => {
    if (mins < 5) return { border: 'border-emerald-500/50', glow: 'shadow-[0_0_20px_rgba(16,185,129,0.1)]', time: 'text-emerald-400', dot: 'bg-emerald-500', pulse: false };
    if (mins < 10) return { border: 'border-amber-500/50', glow: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]', time: 'text-amber-400', dot: 'bg-amber-500', pulse: true };
    return { border: 'border-rose-500', glow: 'shadow-[0_0_30px_rgba(244,63,94,0.3)]', time: 'text-rose-400', dot: 'bg-rose-500', pulse: true };
  };

  const u = getUrgency();

  const statusConfigs = {
    new: { text: 'Start Prep', color: 'bg-slate-800 text-white', border: 'border-white/10', next: 'preparing' as const },
    preparing: { text: 'Mark Ready', color: 'bg-secondary text-slate-950', border: 'border-secondary/20', next: 'ready' as const },
    ready: { text: 'Dispatch', color: 'bg-accent text-slate-950', border: 'border-accent/20', next: 'completed' as const },
    completed: { text: 'Completed', color: 'bg-slate-900 text-slate-500', border: 'border-white/5', next: 'completed' as const }
  };

  const currentStatus = statusConfigs[order.status];

  const handleNextStatus = () => {
    onStatusChange(order.id, currentStatus.next);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        bg-slate-900 border-l-4 border-t border-r border-b border-white/5
        ${u.border} ${u.glow}
        rounded-3xl p-6 backdrop-blur-xl flex flex-col gap-6
        hover:border-white/10 transition-all duration-300
      `}
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <span className="font-black text-2xl text-white tracking-tighter uppercase">
              #{order.id}
            </span>
            {order.tableId && (
              <span className="px-3 py-1 bg-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-white/5">
                T{order.tableId}
              </span>
            )}
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 flex items-center gap-1.5">
            <Clock className="w-2.5 h-2.5" />
            Dine-In Ticket
          </div>
        </div>
        
        {/* Live timer */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/20 border border-white/5 ${u.time} font-black text-xs font-mono`}>
          <span className={`w-1.5 h-1.5 rounded-full ${u.dot} ${u.pulse ? 'animate-pulse' : ''}`}></span>
          {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
        </div>
      </div>

      {/* Items list */}
      <div className="flex-1">
        <div className="space-y-4">
          {order.items.filter(i => !i.isVoided).map((item, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="flex justify-between items-baseline">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-accent font-black text-xs border border-white/5">
                    {item.quantity}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-bold text-white tracking-tight leading-tight">{item.name}</span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <User className="w-2.5 h-2.5 fill-slate-500 text-slate-500" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Seat {item.seatNumber}</span>
                    </div>
                  </div>
                </div>
              </div>
              {item.notes && (
                <div className="ml-11 text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-yellow-500/5 border-l border-yellow-500/20 pl-2 py-0.5 mt-1">
                  MOD: {item.notes}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action button */}
      {order.status !== 'completed' && (
        <button
          onClick={handleNextStatus}
          className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 active:scale-95 border-2 ${currentStatus.color} ${currentStatus.border} shadow-lg`}
        >
          {currentStatus.text}
        </button>
      )}
    </motion.div>
  );
}

