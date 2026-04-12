import { Trash2, Plus, Minus, Printer, Ban } from 'lucide-react';
import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

export function OrderPanel() {
  const { 
    cart, 
    removeFromCart, 
    updateCartItemQuantity, 
    clearCart, 
    sendOrderToKitchen, 
    selectedTableId,
    voidCartItem,
    discountPercent,
    applyDiscount
  } = useAppStore();
  const [promoCode, setPromoCode] = useState('');

  const total = cart.reduce((sum, item) => sum + (item.isVoided ? 0 : item.price * item.quantity), 0);
  const discountAmount = total * (discountPercent / 100);
  const tax = (total - discountAmount) * 0.08;
  const grandTotal = (total - discountAmount) + tax;

  const handleCheckout = () => {
    sendOrderToKitchen();
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'PROSERVE10') {
      applyDiscount(10);
    } else if (promoCode.toUpperCase() === 'ELITE20') {
      applyDiscount(20);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-96 bg-card border-l border-border flex flex-col shadow-2xl z-10 shrink-0 h-full">
      <div className="p-6 border-b border-border bg-gradient-to-br from-[#0b1220] via-card to-card">
        <h2 className="text-xl font-bold text-text-main flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>Current Order</span>
            <button 
              onClick={handlePrint}
              className="p-2 bg-white/5 rounded-lg text-subtext hover:text-white transition-all active:scale-95 no-print"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
          {selectedTableId && (
            <span className="text-sm px-3 py-1 bg-accent/20 text-accentSoft rounded-full">
              Table {selectedTableId}
            </span>
          )}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-subtext opacity-50 space-y-4">
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-600 flex flex-col items-center justify-center bg-gray-800/20">
              <span className="text-2xl mb-1">🍔</span>
            </div>
            <p className="text-lg">Start adding items</p>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item.cartItemId} className={twMerge(clsx(
              "bg-card border border-white/5 p-4 rounded-xl flex flex-col gap-3 group transition-all duration-200 shadow-md relative overflow-hidden",
              item.isVoided && "opacity-40 grayscale border-danger/20"
            ))}>
              <div className="flex justify-between items-start">
                <div className="flex-1 relative">
                  <div className="text-text-main font-semibold text-lg">{item.name}</div>
                  <div className="text-accent text-sm mt-0.5">${(item.price * item.quantity).toFixed(2)}</div>
                  {item.isVoided && <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-danger -rotate-1" />}
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => voidCartItem(item.cartItemId)}
                    title="Void Item"
                    className={twMerge(clsx(
                      "p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all active:scale-95",
                      item.isVoided ? "text-danger" : "text-subtext hover:text-danger"
                    ))}
                  >
                    <Ban className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="text-subtext hover:text-danger p-2 opacity-0 group-hover:opacity-100 transition-opacity active:scale-95"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => updateCartItemQuantity(item.cartItemId, -1)}
                  className="w-10 h-10 rounded-xl bg-bg border border-border flex items-center justify-center hover:bg-gray-800 transition-all active:scale-[0.95] text-text-main shadow-sm"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="w-6 text-center font-bold text-lg">{item.quantity}</span>
                <button 
                  onClick={() => updateCartItemQuantity(item.cartItemId, 1)}
                  className="w-10 h-10 rounded-xl bg-bg border border-border flex items-center justify-center hover:bg-gray-800 transition-all active:scale-[0.95] text-text-main shadow-sm"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

        <div className="space-y-4">
          {cart.length > 0 && (
            <div className="relative group no-print">
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

          <div className="space-y-2 text-sm text-subtext">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-text-main font-medium">${total.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-success font-bold uppercase text-[10px] tracking-widest">
                <span>Discount ({discountPercent}%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Tax (8%)</span>
              <span className="text-text-main font-medium">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-2xl font-bold text-text-main pt-4 border-t border-border mt-4">
              <span>Total</span>
              <span className="text-accent">${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <button 
            onClick={clearCart}
            disabled={cart.length === 0}
            className="bg-transparent border border-gray-700 text-subtext hover:text-text-main hover:bg-gray-800 transition-all duration-200 ease-in-out px-4 py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold active:scale-[0.97]"
          >
            Cancel
          </button>
          <button 
            onClick={handleCheckout}
            disabled={cart.length === 0 || !isClockedIn}
            className="bg-accent hover:bg-accentSoft text-black font-bold text-lg px-4 py-4 rounded-xl transition-all duration-200 ease-in-out active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/20"
          >
            {isClockedIn ? 'Send Order' : 'Clock In First'}
          </button>
        </div>
      </div>
    </div>
  );
}
