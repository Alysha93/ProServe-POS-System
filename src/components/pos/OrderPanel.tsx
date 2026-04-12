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

      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-subtext opacity-50 space-y-4">
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center">
              <span>Empty</span>
            </div>
            <p>Add items to start order</p>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item.cartItemId} className="bg-bg border border-border p-3 rounded-2xl flex flex-col gap-3 group transition-all duration-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="text-text-main font-semibold">{item.name}</div>
                  <div className="text-accent text-sm mt-0.5">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="text-subtext hover:text-danger p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => updateCartItemQuantity(item.cartItemId, -1)}
                  className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center hover:bg-gray-800 transition active:scale-95 text-text-main"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-4 text-center font-medium">{item.quantity}</span>
                <button 
                  onClick={() => updateCartItemQuantity(item.cartItemId, 1)}
                  className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center hover:bg-gray-800 transition active:scale-95 text-text-main"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-6 border-t border-border bg-card space-y-4">
        <div className="space-y-2 text-sm text-subtext">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-text-main pt-2 border-t border-border mt-2">
            <span>Total</span>
            <span className="text-accent">${grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button 
            onClick={clearCart}
            disabled={cart.length === 0}
            className="bg-transparent border border-border text-subtext hover:text-text-main hover:bg-gray-800 transition-all duration-200 ease-in-out px-4 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed font-medium active:scale-95"
          >
            Cancel
          </button>
          <button 
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="bg-accent hover:bg-accentSoft text-black font-bold px-4 py-3 rounded-xl transition-all duration-200 ease-in-out active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send Order
          </button>
        </div>
      </div>
    </div>
  );
}
