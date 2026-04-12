import { create } from 'zustand';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  image?: string;
  description?: string;
}

export interface CartItem extends MenuItem {
  cartItemId: string; // Unique ID for the cart instance
  quantity: number;
  notes: string;
}

export interface Order {
  id: string;
  tableId: string | null;
  items: CartItem[];
  status: 'new' | 'preparing' | 'ready' | 'completed';
  total: number;
  createdAt: number;
}

export interface Table {
  id: string;
  number: string;
  status: 'empty' | 'occupied' | 'paying';
  currentOrderId: string | null;
}

interface AppState {
  // Menu Data
  menu: MenuItem[];
  categories: { id: string; name: string }[];
  
  // POS Cart State
  cart: CartItem[];
  selectedTableId: string | null;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartItemQuantity: (cartItemId: string, delta: number) => void;
  updateCartItemNotes: (cartItemId: string, notes: string) => void;
  clearCart: () => void;
  setSelectedTable: (id: string | null) => void;
  
  // Kitchen State
  activeOrders: Order[];
  sendOrderToKitchen: () => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  
  // Tables State
  tables: Table[];
  updateTableStatus: (tableId: string, status: Table['status']) => void;
}

// Mock initial data
const MOCK_CATEGORIES = [
  { id: 'burgers', name: 'Burgers' },
  { id: 'drinks', name: 'Drinks' },
  { id: 'sides', name: 'Sides' },
  { id: 'desserts', name: 'Desserts' }
];

const MOCK_MENU: MenuItem[] = [
  { id: 'm1', name: 'Classic Smash Burger', price: 12.99, categoryId: 'burgers', description: 'Double beef patty, american cheese' },
  { id: 'm2', name: 'Spicy Chicken Sandwich', price: 11.99, categoryId: 'burgers' },
  { id: 'm3', name: 'Truffle Fries', price: 6.99, categoryId: 'sides' },
  { id: 'm4', name: 'Onion Rings', price: 5.99, categoryId: 'sides' },
  { id: 'm5', name: 'Craft IPA', price: 7.00, categoryId: 'drinks' },
  { id: 'm6', name: 'Diet Cola', price: 2.99, categoryId: 'drinks' },
  { id: 'm7', name: 'Vanilla Shake', price: 6.50, categoryId: 'desserts' },
];

const MOCK_TABLES: Table[] = [
  { id: 't1', number: '1', status: 'empty', currentOrderId: null },
  { id: 't2', number: '2', status: 'empty', currentOrderId: null },
  { id: 't3', number: '3', status: 'empty', currentOrderId: null },
  { id: 't4', number: '4', status: 'empty', currentOrderId: null },
  { id: 't5', number: '12', status: 'empty', currentOrderId: null }
];

export const useAppStore = create<AppState>((set) => ({
  menu: MOCK_MENU,
  categories: MOCK_CATEGORIES,
  
  cart: [],
  selectedTableId: null,
  
  addToCart: (item) => set((state) => {
    // If exact item without notes exists, just increment quantity (for simplicity)
    const existing = state.cart.find(c => c.id === item.id && c.notes === '');
    if (existing) {
      return {
        cart: state.cart.map(c => 
          c.cartItemId === existing.cartItemId 
            ? { ...c, quantity: c.quantity + 1 } 
            : c
        )
      };
    }
    
    // Otherwise add new row
    const newItem: CartItem = { 
      ...item, 
      cartItemId: Math.random().toString(36).substring(7),
      quantity: 1, 
      notes: '' 
    };
    return { cart: [...state.cart, newItem] };
  }),
  
  removeFromCart: (cartItemId) => set((state) => ({
    cart: state.cart.filter(c => c.cartItemId !== cartItemId)
  })),

  updateCartItemQuantity: (cartItemId, delta) => set((state) => ({
    cart: state.cart.map(c => {
      if (c.cartItemId === cartItemId) {
        const newQty = Math.max(1, c.quantity + delta);
        return { ...c, quantity: newQty };
      }
      return c;
    })
  })),

  updateCartItemNotes: (cartItemId, notes) => set((state) => ({
    cart: state.cart.map(c => c.cartItemId === cartItemId ? { ...c, notes } : c)
  })),
  
  clearCart: () => set({ cart: [], selectedTableId: null }),
  
  setSelectedTable: (id) => set({ selectedTableId: id }),

  activeOrders: [],
  
  sendOrderToKitchen: () => set((state) => {
    if (state.cart.length === 0) return state;
    
    const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const newOrder: Order = {
      id: Math.random().toString(36).substring(7).toUpperCase(),
      tableId: state.selectedTableId,
      items: [...state.cart],
      status: 'new',
      total,
      createdAt: Date.now()
    };
    
    // Update table status if table is selected
    const tables = state.tables.map(t => 
      t.id === state.selectedTableId 
        ? { ...t, status: 'occupied' as const, currentOrderId: newOrder.id }
        : t
    );

    return {
      activeOrders: [...state.activeOrders, newOrder],
      cart: [], // clear cart after sending
      selectedTableId: null,
      tables
    };
  }),

  updateOrderStatus: (orderId, status) => set((state) => {
    let orderToUpdate = state.activeOrders.find(o => o.id === orderId);
    let tables = state.tables;
    
    // If order completed, maybe free up table
    if (status === 'completed' && orderToUpdate?.tableId) {
       tables = state.tables.map(t => 
         t.id === orderToUpdate!.tableId 
           ? { ...t, status: 'paying' as const } 
           : t
       );
    }

    return {
      activeOrders: state.activeOrders.map(o => 
        o.id === orderId ? { ...o, status } : o
      ),
      tables
    };
  }),

  tables: MOCK_TABLES,
  updateTableStatus: (tableId, status) => set((state) => ({
    tables: state.tables.map(t => t.id === tableId ? { ...t, status } : t)
  }))
}));
