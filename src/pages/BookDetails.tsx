import BookDetailsCard from '../components/BookDetailsCard';
import { BookDetailsProps } from '../Types';
import books from '../books.json';
import BookDetailsCardSkeleton from '../components/BookDetailsCardSkeleton';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect } from 'react';
import { fetchBookDetails } from '../store/thunks/fetchBookDetails';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const dispatch = useAppDispatch();
  const { book, isLoading } = useAppSelector((state) => state.details);
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchBookDetails(id as string));
  }, []);

  return (
    <div className="section-details section-mt">
      {isLoading ? (
        <BookDetailsCardSkeleton />
      ) : (
        <BookDetailsCard
          key={book[0]?.id}
          id={book[0]?.id}
          accessInfo={{
            pdf: {
              downloadLink: book[0]?.accessInfo.pdf.downloadLink,
            },
          }}
          saleInfo={{
            buyLink: book[0]?.saleInfo.buyLink,
            saleability: book[0]?.saleInfo.saleability,
            listPrice: {
              amount: book[0]?.saleInfo.listPrice?.amount,
              currencyCode: book[0]?.saleInfo.listPrice?.currencyCode,
            },
            retailPrice: {
              amount: book[0]?.saleInfo.retailPrice?.amount,
              currencyCode: book[0]?.saleInfo.retailPrice?.currencyCode,
            },
          }}
          volumeInfo={{
            authors: book[0]?.volumeInfo.authors,
            pageCount: book[0]?.volumeInfo.pageCount,
            previewLink: book[0]?.volumeInfo.previewLink,
            publishedDate: book[0]?.volumeInfo.publishedDate,
            publisher: book[0]?.volumeInfo.publisher,
            title: book[0]?.volumeInfo.title,
            subtitle: book[0]?.volumeInfo.subtitle,
            categories: book[0]?.volumeInfo.categories,
            description: book[0]?.volumeInfo.description,
            imageLinks: {
              thumbnail: book[0]?.volumeInfo.imageLinks?.thumbnail,
            },
          }}
        />
      )}
    </div>
  );
};

export default BookDetails;
