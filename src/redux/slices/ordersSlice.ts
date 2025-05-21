import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from './cartSlice';

interface OrderItem {
  orderId: string;
  date: string;
  status: string;
  items: Array<{
    title: string;
    author: string;
    price: number;
    quantity: number;
    coverImage: string;
  }>;
  total: number;
  deliveryAddress: string;
}

interface OrdersState {
  orders: OrderItem[];
}

const initialState: OrdersState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<{
      items: CartItem[];
      deliveryAddress: string;
    }>) => {
      const subtotal = action.payload.items.reduce(
        (sum, item) => sum + (item.price * item.quantity), 0
      );
      const deliveryFee = 3.99;
      
      const newOrder: OrderItem = {
        orderId: `ORD-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        status: 'Processing',
        items: action.payload.items.map(item => ({
          title: item.title,
          author: item.author,
          price: item.price,
          quantity: item.quantity,
          coverImage: item.coverImage
        })),
        total: subtotal + deliveryFee,
        deliveryAddress: action.payload.deliveryAddress
      };
      state.orders.push(newOrder);
    },
    updateOrderStatus: (state, action: PayloadAction<{
      orderId: string;
      status: string;
    }>) => {
      const order = state.orders.find(o => o.orderId === action.payload.orderId);
      if (order) {
        order.status = action.payload.status;
      }
    },
  },
});

export const { addOrder, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;