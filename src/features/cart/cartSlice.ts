import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  title: string;
  author: string;
  publisher: string;
  price: number;
  quantity: number;
  coverImage: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      publisher: "Scribner",
      price: 12.99,
      quantity: 1,
      coverImage: "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      publisher: "J. B. Lippincott & Co.",
      price: 10.50,
      quantity: 2,
      coverImage: "https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      publisher: "Secker & Warburg",
      price: 9.99,
      quantity: 1,
      coverImage: "https://m.media-amazon.com/images/I/81WunXq0HjL._AC_UF1000,1000_QL80_.jpg"
    }
  ]
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    }
  }
});

export const { increaseQuantity, decreaseQuantity, removeItem, updateCart } = cartSlice.actions;
export default cartSlice.reducer;