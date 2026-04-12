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
  { id: 'mains', name: 'Mains' },
  { id: 'sides', name: 'Sides' },
  { id: 'salads', name: 'Salads' },
  { id: 'pizza', name: 'Pizza' },
  { id: 'street-food', name: 'Street Food' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'soft-drinks', name: 'Soft Drinks' },
  { id: 'hot-drinks', name: 'Hot Drinks' },
  { id: 'specialty', name: 'Specialty' }
];

const MOCK_MENU: MenuItem[] = [
  // Mains
  { id: 'm1', name: 'Classic Cheeseburger', price: 12.99, categoryId: 'mains', description: 'Juicy beef patty with cheese, lettuce, and tomato' },
  { id: 'm2', name: 'Double Bacon Burger', price: 15.99, categoryId: 'mains', description: 'Extra bacon, double beef' },
  { id: 'm3', name: 'BBQ Chicken Sandwich', price: 13.49, categoryId: 'mains', description: 'Grilled chicken with BBQ sauce' },
  { id: 'm4', name: 'Spicy Crispy Chicken', price: 13.99, categoryId: 'mains', description: 'Deep fried spicy chicken breast' },
  { id: 'm5', name: 'Veggie Burger', price: 11.99, categoryId: 'mains', description: 'Plant-based patty with all the fixings' },
  { id: 'm6', name: 'Mushroom Swiss Burger', price: 14.49, categoryId: 'mains' },
  { id: 'm7', name: 'Grilled Chicken Club', price: 14.99, categoryId: 'mains' },
  { id: 'm8', name: 'Pulled Pork Sandwich', price: 13.99, categoryId: 'mains' },
  
  // Sides
  { id: 's1', name: 'French Fries', price: 4.99, categoryId: 'sides' },
  { id: 's2', name: 'Sweet Potato Fries', price: 5.99, categoryId: 'sides' },
  { id: 's3', name: 'Onion Rings', price: 5.49, categoryId: 'sides' },
  { id: 's4', name: 'Side Salad', price: 4.99, categoryId: 'sides' },
  { id: 's5', name: 'Mac & Cheese', price: 6.99, categoryId: 'sides' },
  { id: 's6', name: 'Coleslaw', price: 3.99, categoryId: 'sides' },
  { id: 's7', name: 'Garlic Bread', price: 4.49, categoryId: 'sides' },
  
  // Salads
  { id: 'sa1', name: 'Caesar Salad', price: 9.99, categoryId: 'salads' },
  { id: 'sa2', name: 'Chicken Caesar', price: 12.99, categoryId: 'salads' },
  { id: 'sa3', name: 'Greek Salad', price: 10.99, categoryId: 'salads' },
  { id: 'sa4', name: 'Cobb Salad', price: 13.99, categoryId: 'salads' },
  { id: 'sa5', name: 'Garden Salad', price: 8.99, categoryId: 'salads' },
  
  // Pizza
  { id: 'p1', name: 'Margherita Pizza', price: 14.99, categoryId: 'pizza' },
  { id: 'p2', name: 'Pepperoni Pizza', price: 16.99, categoryId: 'pizza' },
  { id: 'p3', name: 'BBQ Chicken Pizza', price: 17.99, categoryId: 'pizza' },
  { id: 'p4', name: 'Veggie Pizza', price: 15.99, categoryId: 'pizza' },
  { id: 'p5', name: 'Meat Lovers Pizza', price: 18.99, categoryId: 'pizza' },
  
  // Street Food
  { id: 'sf1', name: 'Chicken Tacos (3)', price: 11.99, categoryId: 'street-food' },
  { id: 'sf2', name: 'Beef Tacos (3)', price: 12.99, categoryId: 'street-food' },
  { id: 'sf3', name: 'Nachos Supreme', price: 13.99, categoryId: 'street-food' },
  { id: 'sf4', name: 'Loaded Fries', price: 9.99, categoryId: 'street-food' },
  { id: 'sf5', name: 'Quesadilla', price: 11.49, categoryId: 'street-food' },
  
  // Desserts
  { id: 'd1', name: 'Chocolate Lava Cake', price: 7.99, categoryId: 'desserts' },
  { id: 'd2', name: 'Cheesecake', price: 6.99, categoryId: 'desserts' },
  { id: 'd3', name: 'Ice Cream Sundae', price: 5.99, categoryId: 'desserts' },
  { id: 'd4', name: 'Brownie', price: 4.99, categoryId: 'desserts' },
  
  // Soft Drinks
  { id: 'sd1', name: 'Coca-Cola', price: 2.99, categoryId: 'soft-drinks' },
  { id: 'sd2', name: 'Diet Coke', price: 2.99, categoryId: 'soft-drinks' },
  { id: 'sd3', name: 'Sprite', price: 2.99, categoryId: 'soft-drinks' },
  { id: 'sd4', name: 'Iced Tea', price: 2.99, categoryId: 'soft-drinks' },
  { id: 'sd5', name: 'Lemonade', price: 3.49, categoryId: 'soft-drinks' },
  
  // Hot Drinks
  { id: 'hd1', name: 'Coffee', price: 2.49, categoryId: 'hot-drinks' },
  { id: 'hd2', name: 'Latte', price: 3.99, categoryId: 'hot-drinks' },
  { id: 'hd3', name: 'Cappuccino', price: 3.99, categoryId: 'hot-drinks' },
  { id: 'hd4', name: 'Espresso', price: 2.99, categoryId: 'hot-drinks' },
  { id: 'hd5', name: 'Hot Chocolate', price: 3.49, categoryId: 'hot-drinks' },
  
  // Specialty
  { id: 'sp1', name: 'Milkshake (Vanilla)', price: 5.99, categoryId: 'specialty' },
  { id: 'sp2', name: 'Milkshake (Chocolate)', price: 5.99, categoryId: 'specialty' },
  { id: 'sp3', name: 'Strawberry Smoothie', price: 5.49, categoryId: 'specialty' },
  { id: 'sp4', name: 'Mango Smoothie', price: 5.49, categoryId: 'specialty' },
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
