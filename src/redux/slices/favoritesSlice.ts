import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../../components/books/BooksPage';

interface FavoritesState {
  books: Book[];
}

const initialState: FavoritesState = {
  books: [],
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

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;