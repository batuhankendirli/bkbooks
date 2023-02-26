import { ComponentPropsWithoutRef, ReactNode } from 'react';

export type ButtonProps = {
  children: ReactNode;
  primary?: boolean;
  secondary?: boolean;
  rounded?: boolean;
  roundedFull?: boolean;
  outline?: boolean;
} & ComponentPropsWithoutRef<'button'>;

export type BookProps = {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publisher: string;
    imageLinks: {
      smallThumbnail: string;
    };
  };
};
