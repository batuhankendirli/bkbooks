import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseDetailedData } from '../../utils/parseDetailedData';

const fetchBookDetails = createAsyncThunk('books/details', async (bookId: string) => {
  const response = await axios.get(`${import.meta.env.VITE_BOOKS_API}/${bookId}`);

  const parsedData = await parseDetailedData(response.data);
  return parsedData;
});

export { fetchBookDetails };
