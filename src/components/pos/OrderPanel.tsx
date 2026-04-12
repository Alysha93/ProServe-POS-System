import { Trash2, Plus, Minus } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export function OrderPanel() {
  const { cart, removeFromCart, updateCartItemQuantity, clearCart, sendOrderToKitchen, selectedTableId } = useAppStore();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = total * 0.08;
  const grandTotal = total + tax;

  const handleCheckout = () => {
    sendOrderToKitchen();
  };

  return (
    <div className="w-96 bg-card border-l border-border flex flex-col shadow-2xl z-10 shrink-0 h-full">
      <div className="p-6 border-b border-border bg-gradient-to-br from-[#0b1220] via-card to-card">
        <h2 className="text-xl font-bold text-text-main flex items-center justify-between">
          <span>Current Order</span>
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
            <div key={item.cartItemId} className="bg-card border border-white/5 p-4 rounded-xl flex flex-col gap-3 group transition-all duration-200 shadow-md">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="text-text-main font-semibold text-lg">{item.name}</div>
                  <div className="text-accent text-sm mt-0.5">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="text-subtext hover:text-danger p-2 opacity-0 group-hover:opacity-100 transition-opacity active:scale-95"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
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

      <div className="p-6 border-t border-border bg-card space-y-4 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.3)]">
        <div className="space-y-2 text-sm text-subtext">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="text-text-main font-medium">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (8%)</span>
            <span className="text-text-main font-medium">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-2xl font-bold text-text-main pt-4 border-t border-border mt-4">
            <span>Total</span>
            <span className="text-accent">${grandTotal.toFixed(2)}</span>
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
            disabled={cart.length === 0}
            className="bg-accent hover:bg-accentSoft text-black font-bold text-lg px-4 py-4 rounded-xl transition-all duration-200 ease-in-out active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/20"
          >
            Send Order
          </button>
        </div>
      </div>
    </div>
  );
}
