import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  rating?: number;
  discount?: number;
}

interface FavoritesState {
  books: Book[];
}

const initialState: FavoritesState = {
  books: [
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 12.99,
      coverImage: 'https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg',
      rating: 4,
      discount: 10,
    },
    {
      id: '2',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      price: 9.99,
      coverImage: 'https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg',
      rating: 5,
    },
  ],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Book>) => {
      if (!state.books.some(book => book.id === action.payload.id)) {
        state.books.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter(book => book.id !== action.payload);
    },
    clearFavorites: (state) => {
      state.books = [];
    },
  },
});

export const { 
  addToFavorites, 
  removeFromFavorites, 
  clearFavorites 
} = favoritesSlice.actions;

export default favoritesSlice.reducer;