import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../../components/books/BooksPage';

// Export the CartItem interface
export interface CartItem {
  id: number | string;
  title: string;
  author: string;
  publisher: string;
  price: number;
  quantity: number;
  coverImage: string;
  // Added optional properties to match Book type
  category?: string;
  description?: string;
  inStock?: boolean;
  pageCount?: number;
  language?: string;
  rating?: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [
  ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number | string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    increaseQuantity: (state, action: PayloadAction<number | string>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number | string>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    // New reducer to handle adding Book type directly
    addBookToCart: (state, action: PayloadAction<Book>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const cartItem: CartItem = {
          id: action.payload.id,
          title: action.payload.title,
          author: action.payload.author,
          publisher: action.payload.publisher || 'Unknown Publisher',
          price: action.payload.price,
          quantity: 1,
          coverImage: action.payload.coverImage,
          category: action.payload.category,
          description: action.payload.description,
          inStock: action.payload.inStock,
          pageCount: action.payload.pageCount,
          language: action.payload.language,
          rating: action.payload.rating
        };
        state.items.push(cartItem);
      }
    }
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity, 
  clearCart,
  addBookToCart // Export the new action
} = cartSlice.actions;

export default cartSlice.reducer;