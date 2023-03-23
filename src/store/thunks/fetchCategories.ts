import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BookProps } from '../../Types';
import { parseData } from '../../utils/parseData';

type FetchParams = {
  query: string;
  source: string;
  findBy?: string;
  printType?: string;
  orderBy?: string;
  maxResults?: number;
};

const fetchCategories = createAsyncThunk(
  'categories/fetch',
  async ({
    query,
    findBy = 'intitle',
    printType = 'all',
    orderBy = 'relevance',
    maxResults = 40,
    source,
  }: FetchParams) => {
    const response: BookProps[] = await axios.get(import.meta.env.VITE_BOOKS_API, {
      params: { q: `${findBy}:${query}`, printType, orderBy, maxResults },
    });

    const parsedData: BookProps[] = await parseData(response);

    return parsedData;
  }
);

export { fetchCategories };
