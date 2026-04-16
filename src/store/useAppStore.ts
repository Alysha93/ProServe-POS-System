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
  isVoided?: boolean;
  seatNumber: number; // Guest seat assignment (1-4)
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
  activeSeat: number;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartItemQuantity: (cartItemId: string, delta: number) => void;
  updateCartItemNotes: (cartItemId: string, notes: string) => void;
  updateCartItemSeat: (cartItemId: string, seat: number) => void;
  setActiveSeat: (seat: number) => void;
  clearCart: () => void;
  setSelectedTable: (id: string | null) => void;
  
  // Kitchen State
  activeOrders: Order[];
  sendOrderToKitchen: () => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  
  // Staff State
  isClockedIn: boolean;
  toggleClockIn: () => void;
  
  // Payment State
  discountPercent: number;
  tipAmount: number;
  splitCount: number;
  applyDiscount: (percent: number) => void;
  setTipAmount: (amount: number) => void;
  setSplitCount: (count: number) => void;
  settlePayment: () => void;
  
  // Advanced Actions
  voidCartItem: (cartItemId: string) => void;

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
  { id: 'm1', name: 'Classic Cheeseburger', price: 12.99, categoryId: 'mains', description: 'Juicy grass-fed beef patty with melted cheddar, crisp lettuce, vine-ripened tomatoes, and our signature Pro-sauce on a toasted brioche bun.', image: '/images/burger.png' },
  { id: 'm2', name: 'Double Bacon Burger', price: 15.99, categoryId: 'mains', description: 'Two premium beef patties topped with crispy applewood smoked bacon and double cheddar.', image: '/images/burger_double_bacon.png' },
  { id: 'm3', name: 'BBQ Chicken Sandwich', price: 13.49, categoryId: 'mains', description: 'Grilled chicken breast smothered in tangy hickory BBQ sauce with coleslaw topping.', image: '/images/burger_bbq_chicken.png' },
  { id: 'm4', name: 'Spicy Crispy Chicken', price: 13.99, categoryId: 'mains', description: 'Nashville-style hot chicken breast with pickles and spicy aioli on a soft bun.', image: '/images/burger_spicy_chicken.png' },
  { id: 'm5', name: 'Veggie Burger', price: 11.99, categoryId: 'mains', description: 'Savory mushroom and quinoa patty with avocado, sprouts, and herb mayo.', image: '/images/burger_veggie.png' },
  { id: 'm6', name: 'Mushroom Swiss Burger', price: 14.49, categoryId: 'mains', description: 'Earthly sautéed mushrooms and melted swiss cheese over a prime beef patty.', image: '/images/burger_mushroom_swiss.png' },
  { id: 'm7', name: 'Grilled Chicken Club', price: 14.99, categoryId: 'mains', description: 'Triple-decker with grilled chicken, bacon, lettuce, tomato, and mayo.', image: '/images/burger_chicken_club.png' },
  { id: 'm8', name: 'Pulled Pork Sandwich', price: 13.99, categoryId: 'mains', description: 'Slow-smoked pulled pork with vinegar-based BBQ sauce and sweet pickles.', image: '/images/burger_pulled_pork.png' },
  
  // Sides
  { id: 's1', name: 'French Fries', price: 4.99, categoryId: 'sides', description: 'Crispy, golden, and perfectly seasoned thin-cut fries.', image: '/images/sides_french_fries.png' },
  { id: 's2', name: 'Sweet Potato Fries', price: 5.99, categoryId: 'sides', description: 'Sweet and savory fries served with spicy aioli.', image: '/images/sides_sweet_potato_fries.png' },
  { id: 's3', name: 'Onion Rings', price: 5.49, categoryId: 'sides', description: 'Thick-cut, beer-battered rings fried to perfection.', image: '/images/sides_onion_rings.png' },
  { id: 's4', name: 'Side Salad', price: 4.99, categoryId: 'sides', description: 'Fresh mixed greens with cherry tomatoes and balsamic glaze.', image: '/images/sides_side_salad.png' },
  { id: 's5', name: 'Mac & Cheese', price: 6.99, categoryId: 'sides', description: 'Creamy four-cheese blend with a toasted panko crust.', image: '/images/sides_mac_cheese.png' },
  { id: 's6', name: 'Coleslaw', price: 3.99, categoryId: 'sides', description: 'Crunchy cabbage and carrots in a tangy house-made dressing.', image: '/images/sides_coleslaw.png' },
  { id: 's7', name: 'Garlic Bread', price: 4.49, categoryId: 'sides', description: 'Toasted baguette with roasted garlic butter and fresh herbs.', image: '/images/sides_garlic_bread.png' },
  
  // Salads
  { id: 'sa1', name: 'Caesar Salad', price: 9.99, categoryId: 'salads', description: 'Crisp romaine lettuce, house-made garlicky dressing, parmesan shavings, and sourdough croutons.', image: '/images/salad.png' },
  { id: 'sa2', name: 'Chicken Caesar', price: 12.99, categoryId: 'salads', description: 'Our classic Caesar topped with herb-grilled chicken breast.', image: '/images/salad_chicken_caesar.png' },
  { id: 'sa3', name: 'Greek Salad', price: 10.99, categoryId: 'salads', description: 'Kalamata olives, feta cheese, cucumbers, and red onions with oregano vinaigrette.', image: '/images/salad_greek.png' },
  { id: 'sa4', name: 'Cobb Salad', price: 13.99, categoryId: 'salads', description: 'Avocado, egg, bacon, chicken, and blue cheese over mixed greens.', image: '/images/salad_cobb.png' },
  { id: 'sa5', name: 'Garden Salad', price: 8.99, categoryId: 'salads', description: 'Fresh seasonal vegetables with your choice of dressing.', image: '/images/salad_garden.png' },
  
  // Pizza
  { id: 'p1', name: 'Margherita Pizza', price: 14.99, categoryId: 'pizza', description: 'San Marzano tomato sauce, fresh buffalo mozzarella, and aromatic basil.', image: '/images/pizza.png' },
  { id: 'p2', name: 'Pepperoni Pizza', price: 16.99, categoryId: 'pizza', description: 'Classic NY style with abundant spicy thin-sliced pepperoni.', image: '/images/pizza_pepperoni.png' },
  { id: 'p3', name: 'BBQ Chicken Pizza', price: 17.99, categoryId: 'pizza', description: 'Smoky BBQ sauce, grilled chicken, red onions, and cilantro.', image: '/images/pizza_bbq_chicken.png' },
  { id: 'p4', name: 'Veggie Pizza', price: 15.99, categoryId: 'pizza', description: 'Bell peppers, mushrooms, onions, and black olives.', image: '/images/pizza_veggie.png' },
  { id: 'p5', name: 'Meat Lovers Pizza', price: 18.99, categoryId: 'pizza', description: 'Sausage, bacon, pepperoni, and ham.', image: '/images/pizza_meat_lovers.png' },
  
  // Street Food
  { id: 'sf1', name: 'Chicken Tacos (3)', price: 11.99, categoryId: 'street-food', description: 'Three soft corn tortillas with chipotle chicken, salsa verde, and lime.', image: '/images/street_food_chicken_tacos.png' },
  { id: 'sf2', name: 'Beef Tacos (3)', price: 12.99, categoryId: 'street-food', description: 'Seasoned ground beef with pico de gallo and crema.', image: '/images/street_food_beef_tacos.png' },
  { id: 'sf3', name: 'Nachos Supreme', price: 13.99, categoryId: 'street-food', description: 'Crispy house chips with melted cheese, beans, jalapeños, and guacamole.', image: '/images/street_food_nachos.png' },
  { id: 'sf4', name: 'Loaded Fries', price: 9.99, categoryId: 'street-food', description: 'Fries topped with bacon, cheese sauce, and green onions.', image: '/images/street_food_loaded_fries.png' },
  { id: 'sf5', name: 'Quesadilla', price: 11.49, categoryId: 'street-food', description: 'Griddled flour tortilla with a melted three-cheese blend and salsa.', image: '/images/street_food_quesadilla.png' },
  
  // Desserts
  { id: 'd1', name: 'Chocolate Lava Cake', price: 7.99, categoryId: 'desserts', description: 'Warm chocolate cake with a molten center, served with vanilla ice cream.', image: '/images/dessert_lava_cake.png' },
  { id: 'd2', name: 'Cheesecake', price: 6.99, categoryId: 'desserts', description: 'Classic NY style cheesecake with a graham cracker crust.', image: '/images/dessert_cheesecake.png' },
  { id: 'd3', name: 'Ice Cream Sundae', price: 5.99, categoryId: 'desserts', description: 'Three scoops with hot fudge, nuts, and a cherry on top.', image: '/images/dessert_ice_cream_sundae.png' },
  { id: 'd4', name: 'Brownie', price: 4.99, categoryId: 'desserts', description: 'Rich fudge brownie served warm with a drizzle of chocolate.', image: '/images/dessert_brownie.png' },
  
  // Soft Drinks
  { id: 'sd1', name: 'Coca-Cola', price: 2.99, categoryId: 'soft-drinks', description: 'Ice-cold classic refreshing cola.', image: '/images/drinks_coke.png' },
  { id: 'sd2', name: 'Diet Coke', price: 2.99, categoryId: 'soft-drinks', description: 'Sugar-free crisp cola flavor.', image: '/images/drinks_diet_coke.png' },
  { id: 'sd3', name: 'Sprite', price: 2.99, categoryId: 'soft-drinks', description: 'Lemon-lime sparkling soda.', image: '/images/drinks_sprite.png' },
  { id: 'sd4', name: 'Iced Tea', price: 2.99, categoryId: 'soft-drinks', description: 'Freshly brewed black tea served over ice.', image: '/images/drinks_iced_tea.png' },
  { id: 'sd5', name: 'Lemonade', price: 3.49, categoryId: 'soft-drinks', description: 'Classic tart and sweet lemonade.', image: '/images/drinks_lemonade.png' },
  
  // Hot Drinks
  { id: 'hd1', name: 'Coffee', price: 2.49, categoryId: 'hot-drinks', description: 'Freshly roasted house blend, served hot.', image: '/images/hot_drinks.png' },
  { id: 'hd2', name: 'Latte', price: 3.99, categoryId: 'hot-drinks', description: 'Smooth espresso with steamed milk and a thin layer of foam.', image: '/images/hot_drinks_latte.png' },
  { id: 'hd3', name: 'Cappuccino', price: 3.99, categoryId: 'hot-drinks', description: 'Rich espresso with equal parts steamed milk and foam.', image: '/images/hot_drinks_cappuccino.png' },
  { id: 'hd4', name: 'Espresso', price: 2.99, categoryId: 'hot-drinks', description: 'Bold and concentrated shot of our signature roast.', image: '/images/hot_drinks_espresso.png' },
  { id: 'hd5', name: 'Hot Chocolate', price: 3.49, categoryId: 'hot-drinks', description: 'Rich cocoa with whipped cream and chocolate shavings.', image: '/images/hot_drinks_hot_chocolate.png' },
  
  // Specialty
  { id: 'sp1', name: 'Milkshake (Vanilla)', price: 5.99, categoryId: 'specialty', description: 'Classic thick vanilla bean milkshake with whipped cream.', image: '/images/specialty_vanilla_milkshake.png' },
  { id: 'sp2', name: 'Milkshake (Chocolate)', price: 5.99, categoryId: 'specialty', description: 'Rich chocolate milkshake topped with chocolate sauce.', image: '/images/specialty_chocolate_milkshake.png' },
  { id: 'sp3', name: 'Strawberry Smoothie', price: 5.49, categoryId: 'specialty', description: 'Fresh strawberries blended with yogurt and honey.', image: '/images/specialty_strawberry_smoothie.png' },
  { id: 'sp4', name: 'Mango Smoothie', price: 5.49, categoryId: 'specialty', description: 'Tropical mango puree blended with chilled coconut milk.', image: '/images/specialty_mango_smoothie.png' },
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
  activeSeat: 1,
  
  setActiveSeat: (seat) => set({ activeSeat: seat }),

  addToCart: (item) => set((state) => {
    // If exact item for SAME seat without notes exists, just increment quantity
    const existing = state.cart.find(c => 
      c.id === item.id && 
      c.notes === '' && 
      c.seatNumber === state.activeSeat
    );
    
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
      notes: '',
      seatNumber: state.activeSeat
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

  updateCartItemSeat: (cartItemId, seat) => set((state) => ({
    cart: state.cart.map(c => c.cartItemId === cartItemId ? { ...c, seatNumber: seat } : c)
  })),
  
  clearCart: () => set({ cart: [], selectedTableId: null, discountPercent: 0, tipAmount: 0, splitCount: 1, activeSeat: 1 }),
  
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
      // Keep selectedTableId for transition to Checkout screen
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
  })),

  // Professional Features
  isClockedIn: false,
  toggleClockIn: () => set((state) => ({ isClockedIn: !state.isClockedIn })),

  discountPercent: 0,
  tipAmount: 0,
  splitCount: 1,

  applyDiscount: (percent) => set({ discountPercent: percent }),
  setTipAmount: (amount) => set({ tipAmount: amount }),
  setSplitCount: (count) => set({ splitCount: Math.max(1, count) }),

  settlePayment: () => set((state) => {
    const tables = state.tables.map(t => 
      t.id === state.selectedTableId || (state.selectedTableId === null && t.status === 'paying')
        ? { ...t, status: 'empty' as const, currentOrderId: null }
        : t
    );

    return {
      cart: [],
      selectedTableId: null,
      discountPercent: 0,
      tipAmount: 0,
      splitCount: 1,
      tables
    };
  }),

  voidCartItem: (cartItemId: string) => set((state) => ({
    cart: state.cart.map(c => 
      c.cartItemId === cartItemId ? { ...c, isVoided: !c.isVoided } : c
    )
  }))
}));
