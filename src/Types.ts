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
    listPrice?: {
      amount?: number;
      currencyCode?: string;
    };
    retailPrice?: {
      amount?: number;
      currencyCode?: string;
    };
    buyLink?: string;
  };
  accessInfo: {
    pdf: {
      downloadLink?: string;
    };
  };
} & BookProps;
