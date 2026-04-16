import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, Printer, Ban, Clock, User } from 'lucide-react';
import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

export function OrderPanel() {
  const navigate = useNavigate();
  const { 
    cart, 
    removeFromCart, 
    updateCartItemQuantity, 
    clearCart, 
    sendOrderToKitchen, 
    selectedTableId,
    voidCartItem,
    discountPercent,
    applyDiscount,
    isClockedIn,
    toggleClockIn,
    activeSeat,
    setActiveSeat,
    updateCartItemSeat
  } = useAppStore();

  const [promoCode, setPromoCode] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + (item.isVoided ? 0 : item.price * item.quantity), 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const taxableAmount = subtotal - discountAmount;
  const tax = taxableAmount * 0.08;
  const total = taxableAmount + tax;

  const handleSendToKitchen = () => {
    sendOrderToKitchen();
    navigate('/demo/checkout');
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'PROSERVE10') {
      applyDiscount(10);
    } else if (promoCode.toUpperCase() === 'ELITE20') {
      applyDiscount(20);
    }
  };

  const cycleSeat = (cartItemId: string, currentSeat: number) => {
    const nextSeat = currentSeat >= 4 ? 1 : currentSeat + 1;
    updateCartItemSeat(cartItemId, nextSeat);
  };

  return (
    <div className="w-[28rem] bg-slate-900 border-l border-slate-800 flex flex-col shadow-2xl z-10 shrink-0 h-full overflow-hidden">
      {/* Header */}
      <div className="p-8 pb-6 border-b border-slate-800 bg-gradient-to-br from-slate-950 to-slate-900">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-black text-white tracking-tighter flex items-center gap-3">
            Current Items
          </h2>
          {selectedTableId && (
            <div className="px-4 py-1.5 bg-accent/10 border border-accent/20 text-accent rounded-full text-xs font-black uppercase tracking-widest">
              Table {selectedTableId}
            </div>
          )}
        </div>
        
        {/* Seat Selection Bar */}
        <div className="flex bg-slate-900/50 p-1 rounded-2xl border border-white/5 gap-1">
          {[1, 2, 3, 4].map((seat) => (
            <button
              key={seat}
              onClick={() => setActiveSeat(seat)}
              className={twMerge(clsx(
                "flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2",
                activeSeat === seat 
                  ? "bg-accent text-slate-950 shadow-lg shadow-accent/20" 
                  : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
              ))}
            >
              <User className={twMerge(clsx("w-3.5 h-3.5", activeSeat === seat ? "fill-slate-950" : "fill-none"))} />
              Seat {seat}
            </button>
          ))}
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4 text-center">
            <div className="w-20 h-20 rounded-3xl border-2 border-dashed border-slate-800 flex items-center justify-center bg-slate-900/50">
              <Plus className="w-8 h-8 opacity-20" />
            </div>
            <div>
              <p className="text-lg font-bold text-slate-500">Order is empty</p>
              <p className="text-sm">Select a seat and add items</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-3">
            {cart.map((item) => (
              <div key={item.cartItemId} className={twMerge(clsx(
                "bg-slate-800/30 border border-white/5 p-5 rounded-3xl flex flex-col gap-4 group transition-all duration-300 hover:border-white/10 relative overflow-hidden",
                item.isVoided && "opacity-30 grayscale blur-[1px]"
              ))}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <button 
                        onClick={() => cycleSeat(item.cartItemId, item.seatNumber)}
                        className="px-2 py-0.5 bg-slate-950 text-accent text-[10px] font-black rounded-lg border border-accent/20 hover:bg-accent hover:text-slate-950 transition-colors uppercase tracking-widest"
                      >
                        Seat {item.seatNumber}
                      </button>
                      {item.isVoided && <span className="text-danger text-[10px] font-black uppercase tracking-widest">Voided</span>}
                    </div>
                    <div className="text-white font-black text-lg tracking-tight leading-tight">{item.name}</div>
                    <div className="text-accent font-bold mt-1 text-sm">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => voidCartItem(item.cartItemId)}
                      className={twMerge(clsx(
                        "p-2.5 rounded-xl transition-all active:scale-90 border border-transparent",
                        item.isVoided ? "text-danger bg-danger/10 border-danger/20" : "text-slate-500 hover:text-danger hover:bg-danger/10 hover:border-danger/10"
                      ))}
                    >
                      <Ban className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-slate-500 hover:text-white hover:bg-slate-700 p-2.5 rounded-xl transition-all active:scale-90"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center gap-5">
                  <div className="flex items-center bg-slate-950 p-1 rounded-2xl border border-white/5">
                    <button onClick={() => updateCartItemQuantity(item.cartItemId, -1)} className="w-10 h-10 rounded-xl hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all active:scale-90"><Minus className="w-4 h-4" /></button>
                    <span className="w-10 text-center font-black text-lg text-white">{item.quantity}</span>
                    <button onClick={() => updateCartItemQuantity(item.cartItemId, 1)} className="w-10 h-10 rounded-xl hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all active:scale-90"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-8 border-t border-slate-800 bg-slate-950/50 backdrop-blur-md space-y-6">
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-end border-b border-slate-800 pb-6 mb-2">
            <span className="text-slate-400 font-bold uppercase text-xs tracking-widest">Running Total</span>
            <span className="text-4xl font-black text-white italic tracking-tighter">${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex gap-4 h-16">
          <button 
            onClick={clearCart}
            disabled={cart.length === 0}
            className="flex-1 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-300 rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed font-bold active:scale-95 uppercase tracking-widest text-xs"
          >
            Clear
          </button>
          <button 
            onClick={isClockedIn ? handleSendToKitchen : toggleClockIn}
            disabled={cart.length === 0 && isClockedIn}
            className={twMerge(clsx(
              "flex-[2.5] font-black text-lg rounded-2xl transition-all shadow-2xl flex items-center justify-center gap-3 group",
              isClockedIn 
                ? "bg-accent hover:bg-accent-soft text-slate-950 shadow-accent/20 active:scale-95" 
                : "bg-danger hover:bg-danger-soft text-white shadow-danger/20 active:bg-danger animate-pulse"
            ))}
          >
            {isClockedIn ? (
              <>
                <span>Send & Pay</span>
                <Plus className="w-5 h-5 opacity-50 group-hover:scale-125 transition-transform" />
              </>
            ) : (
              <>
                <Clock className="w-6 h-6" />
                <span>Clock In First</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
