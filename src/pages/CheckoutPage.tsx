import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Banknote, 
  Users, 
  Percent, 
  ArrowLeft, 
  Printer, 
  Receipt,
  Plus,
  Minus,
  User
} from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { 
    activeOrders, 
    selectedTableId, 
    tipAmount, 
    setTipAmount, 
    splitCount, 
    setSplitCount, 
    settlePayment,
    discountPercent,
    tables
  } = useAppStore();

  const [showCustomTip, setShowCustomTip] = useState(false);
  const [customTipValue, setCustomTipValue] = useState('');

  // Find all active orders for the selected table
  const tableOrders = useMemo(() => {
    return activeOrders.filter(o => o.tableId === selectedTableId && (o.status === 'new' || o.status === 'preparing' || o.status === 'ready'));
  }, [activeOrders, selectedTableId]);

  const selectedTable = tables.find(t => t.id === selectedTableId);

  // Combine all items into one flat list for the bill
  const combinedItems = useMemo(() => {
    return tableOrders.flatMap(order => order.items);
  }, [tableOrders]);

  // Group items by seat
  const itemsBySeat = useMemo(() => {
    const groups: Record<number, typeof combinedItems> = {};
    combinedItems.forEach(item => {
      const seat = item.seatNumber || 1;
      if (!groups[seat]) groups[seat] = [];
      groups[seat].push(item);
    });
    return groups;
  }, [combinedItems]);

  const activeSeatsCount = Object.keys(itemsBySeat).length;

  // Auto-set split count to active seats count on load
  useEffect(() => {
    if (activeSeatsCount > 0) {
      setSplitCount(activeSeatsCount);
    }
  }, [activeSeatsCount, setSplitCount]);

  const subtotal = combinedItems.reduce((sum, item) => sum + (item.isVoided ? 0 : item.price * item.quantity), 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const taxableAmount = subtotal - discountAmount;
  const tax = taxableAmount * 0.08;
  const totalBeforeTip = taxableAmount + tax;
  const grandTotal = totalBeforeTip + tipAmount;
  const perPerson = grandTotal / splitCount;

  const handleCustomTipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(customTipValue);
    if (!isNaN(amount)) {
      setTipAmount(amount);
      setShowCustomTip(false);
    }
  };

  const handleSettle = () => {
    settlePayment();
    navigate('/demo/tables');
  };

  if (!selectedTableId || tableOrders.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-950 p-8">
        <div className="w-24 h-24 rounded-full bg-slate-900 flex items-center justify-center mb-6">
          <Receipt className="w-10 h-10 text-slate-700" />
        </div>
        <h1 className="text-2xl font-black text-white mb-2">No Active Bill Found</h1>
        <p className="text-slate-500 mb-8 text-center max-w-xs">Select a table with an active order to view and settle the check.</p>
        <button 
          onClick={() => navigate('/demo/tables')}
          className="px-8 py-4 bg-accent text-slate-950 font-black rounded-2xl hover:bg-accent-soft transition-all active:scale-95"
        >
          Go to Tables
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex bg-slate-950 overflow-hidden h-full">
      {/* Left side: Bill Summary */}
      <div className="flex-1 flex flex-col border-r border-slate-800/50">
        <div className="p-10 pb-6">
          <button 
            onClick={() => navigate('/demo')}
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest">Back to Menu</span>
          </button>
          
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-4xl font-black text-white tracking-tighter mb-1">Table {selectedTable?.number}</h1>
              <p className="text-slate-500 font-medium">Checkout Session • {combinedItems.length} Items across {activeSeatsCount} seats</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-slate-400 hover:text-white rounded-xl border border-slate-800 transition-all font-bold text-sm">
              <Printer className="w-4 h-4" />
              Print Receipt
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-10 py-6 no-scrollbar space-y-10">
          {Object.entries(itemsBySeat).sort(([a], [b]) => Number(a) - Number(b)).map(([seat, items]) => {
            const seatSubtotal = items.reduce((sum, item) => sum + (item.isVoided ? 0 : item.price * item.quantity), 0);
            return (
              <div key={seat} className="space-y-4">
                <div className="flex items-center gap-2 text-accent">
                  <User className="w-4 h-4 fill-accent" />
                  <h3 className="text-sm font-black uppercase tracking-widest">Seat {seat}</h3>
                  <div className="flex-1 border-b border-accent/20 h-px ml-2"></div>
                  <span className="text-xs font-black ml-2">${seatSubtotal.toFixed(2)}</span>
                </div>
                <div className="space-y-3">
                  {items.map((item, idx) => (
                    <div key={`${item.cartItemId}-${idx}`} className={twMerge(clsx(
                      "flex items-center justify-between p-5 bg-slate-900/40 rounded-3xl border border-white/5",
                      item.isVoided && "opacity-30 line-through"
                    ))}>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center font-black text-accent border border-white/5 text-sm">
                          {item.quantity}
                        </div>
                        <div>
                          <div className="text-white font-bold">{item.name}</div>
                        </div>
                      </div>
                      <div className="text-white font-black">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-10 bg-slate-900/20 border-t border-slate-800/50">
          <div className="max-w-md ml-auto space-y-3">
            <div className="flex justify-between text-slate-500 font-medium text-sm">
              <span>Combined Subtotal</span>
              <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500 font-medium text-sm">
              <span>Sales Tax (8%)</span>
              <span className="text-white font-bold">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-400 font-black pt-4 border-t border-slate-800/50">
              <span className="uppercase text-xs tracking-[0.2em]">Grand Total</span>
              <span className="text-3xl text-white italic tracking-tighter">${totalBeforeTip.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Payment Controls */}
      <div className="w-[32rem] p-10 flex flex-col justify-between bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="space-y-12">
          {/* Split Bill Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-slate-400">
              <Users className="w-5 h-5" />
              <h3 className="text-sm font-black uppercase tracking-widest">Split the check</h3>
            </div>
            <div className="flex items-center justify-between bg-slate-950 p-6 rounded-[2.5rem] border border-white/5 shadow-inner">
              <span className="text-2xl font-black text-white italic ml-4">{splitCount} {splitCount === 1 ? 'Guest' : 'Guests'}</span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setSplitCount(splitCount - 1)} 
                  className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white hover:bg-slate-800 transition-all active:scale-95"
                >
                  <Minus className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setSplitCount(splitCount + 1)} 
                  className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white hover:bg-slate-800 transition-all active:scale-95"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>
            </div>
            {activeSeatsCount > 0 && (
              <p className="text-xs text-slate-500 px-4">Auto-calculated from {activeSeatsCount} active guest seats.</p>
            )}
          </div>

          {/* Gratuity Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-slate-400">
              <Percent className="w-5 h-5" />
              <h3 className="text-sm font-black uppercase tracking-widest">Add Tip</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[15, 18, 20].map((pct) => (
                <button 
                  key={pct}
                  onClick={() => {
                    setTipAmount(totalBeforeTip * (pct / 100));
                    setShowCustomTip(false);
                  }}
                  className={twMerge(clsx(
                    "py-6 rounded-3xl border-2 font-black text-xl transition-all relative overflow-hidden group",
                    tipAmount === totalBeforeTip * (pct / 100)
                      ? "bg-accent border-accent text-slate-950 shadow-2xl shadow-accent/40"
                      : "bg-slate-900/50 border-white/5 text-slate-400 hover:border-white/20 hover:text-white"
                  ))}
                >
                  {pct}%
                  <span className="block text-[10px] opacity-50 font-medium">(${(totalBeforeTip * (pct / 100)).toFixed(2)})</span>
                </button>
              ))}
              <button 
                onClick={() => setShowCustomTip(!showCustomTip)}
                className={twMerge(clsx(
                  "py-6 rounded-3xl border-2 font-black text-xl transition-all",
                  showCustomTip ? "bg-accent border-accent text-slate-950 text-2xl" : "bg-slate-900/50 border-white/5 text-slate-400"
                ))}
              >
                Other
              </button>
            </div>

            {showCustomTip && (
              <form onSubmit={handleCustomTipSubmit} className="relative animate-in fade-in slide-in-from-top-4 duration-300">
                <input 
                  autoFocus
                  type="number" 
                  step="0.01"
                  placeholder="0.00" 
                  value={customTipValue}
                  onChange={(e) => setCustomTipValue(e.target.value)}
                  className="w-full bg-slate-950 border-2 border-accent/30 rounded-3xl px-8 py-6 text-2xl font-black text-white focus:outline-none focus:border-accent transition-all pl-14"
                />
                <span className="absolute left-8 top-1/2 -translate-y-1/2 text-accent font-black text-2xl mb-1">$</span>
                <button type="submit" className="absolute right-3 top-3 bottom-3 px-8 bg-accent text-slate-950 text-xs font-black uppercase rounded-2xl shadow-xl">Apply</button>
              </form>
            )}
          </div>
        </div>

        {/* Final Actions */}
        <div className="space-y-8">
          <div className="p-8 bg-slate-950 rounded-[3rem] border border-white/5 space-y-4 shadow-3xl">
            <div className="flex justify-between items-end">
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Total Check</span>
              <div className="text-6xl font-black text-accent italic tracking-tighter">${grandTotal.toFixed(2)}</div>
            </div>
            {splitCount > 1 && (
              <div className="flex justify-between items-center pt-6 border-t border-slate-800">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Weighted Average / Guest</span>
                <span className="text-3xl font-black text-white italic tracking-tighter">${perPerson.toFixed(2)}</span>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button 
              onClick={handleSettle}
              className="flex-1 h-24 bg-slate-900 border-2 border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center gap-1 hover:bg-slate-800 transition-all active:scale-95 group"
            >
              <Banknote className="w-6 h-6 text-emerald-500 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Settle Cash</span>
            </button>
            <button 
              onClick={handleSettle}
              className="flex-[2] h-24 bg-accent rounded-[2.5rem] flex flex-col items-center justify-center gap-1 hover:bg-accent-soft transition-all active:scale-95 group shadow-2xl shadow-accent/30"
            >
              <CreditCard className="w-7 h-7 text-slate-950 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-950">Confirm Payment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
