import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data.map((item, index) => ({
    id: item.id,
    title: item.title,
    author: `Author ${item.id}`,
    description: item.body,
    category: ['Fiction', 'Non-Fiction', 'Sci-Fi', 'Biography', 'Mystery', 'Romance'][index % 6], // Assign categories
    rating: (Math.random() * 5).toFixed(1),
  }));
});

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    addBook: (state, action) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addBook } = booksSlice.actions;
export default booksSlice.reducer;
