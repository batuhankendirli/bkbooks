import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BookProps } from '../../Types';
import { parseData } from '../../utils/parseData';

type FetchParams = {
  query: string;
  findBy?: string;
  printType?: string;
  orderBy?: string;
  maxResults?: number;
};

const fetchBooks = createAsyncThunk(
  'books/fetch',
  async ({ query, findBy = 'intitle', printType = 'all', orderBy = 'relevance', maxResults = 40 }: FetchParams) => {
    const response: BookProps[] = await axios.get(
      `${
        import.meta.env.VITE_BOOKS_API
      }?q=${findBy}:${query}&printType=${printType}&orderBy=${orderBy}&maxResults=${maxResults}`
    );
    await pause(1500);

    const parsedData: BookProps[] = await parseData(response);

    return parsedData;
  }
);

const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { fetchBooks };
