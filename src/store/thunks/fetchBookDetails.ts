import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseDetailedData } from '../../utils/parseDetailedData';

const fetchBookDetails = createAsyncThunk('books/details', async (bookId: string) => {
  const response = await axios.get(`${import.meta.env.VITE_BOOKS_API}/${bookId}`);

  await pause(1500);

  const parsedData = await parseDetailedData(response);

  return parsedData;
});

const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { fetchBookDetails };
