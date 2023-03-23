import { SerializedError } from '@reduxjs/toolkit';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

export type ButtonProps = {
  children: ReactNode;
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  fourth?: boolean;
  rounded?: boolean;
  roundedFull?: boolean;
  outline?: boolean;
} & ComponentPropsWithoutRef<'button'>;

export type BookProps = {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publisher: string;
    imageLinks?: {
      thumbnail?: string;
    };
  };
};

export type Price = {
  amount?: number;
  currencyCode?: string;
};

export type BookDetailsProps = {
  volumeInfo: {
    publishedDate?: string;
    pageCount: number;
    previewLink: string;
    subtitle?: string;
    categories?: string[];
    description?: string;
  };
  saleInfo: {
    saleability: string;
    listPrice: Price | undefined;
    retailPrice: Price | undefined;
    buyLink?: string;
  };
  accessInfo: {
    pdf: {
      downloadLink?: string;
    };
  };
} & BookProps;

export type ModalRefProps = {
  open: () => boolean;
  close: () => boolean;
};

export type LoginSignupFormProps = {
  title: string;
  switchTitle: () => void;
  handleSuccess: () => void;
};

export type SearchProps = {
  advanced?: boolean;
  handleSave?: () => void;
} & ComponentPropsWithoutRef<'input'>;

export type InitialState = {
  books: BookProps[];
  searchTerm: string;
  findBy: string;
  printType: string;
  orderBy: string;
  isLoading: boolean;
  error: SerializedError | null;
};
