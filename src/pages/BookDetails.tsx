import BookDetailsCard from '../components/BookDetailsCard';
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
        book && (
          <BookDetailsCard
            key={book.id}
            id={book.id}
            accessInfo={{
              pdf: {
                downloadLink: book.accessInfo.pdf.downloadLink,
              },
            }}
            saleInfo={{
              buyLink: book.saleInfo.buyLink,
              saleability: book.saleInfo.saleability,
              listPrice: {
                amount: book.saleInfo.listPrice?.amount,
                currencyCode: book.saleInfo.listPrice?.currencyCode,
              },
              retailPrice: {
                amount: book.saleInfo.retailPrice?.amount,
                currencyCode: book.saleInfo.retailPrice?.currencyCode,
              },
            }}
            volumeInfo={{
              authors: book.volumeInfo.authors,
              pageCount: book.volumeInfo.pageCount,
              previewLink: book.volumeInfo.previewLink,
              publishedDate: book.volumeInfo.publishedDate,
              publisher: book.volumeInfo.publisher,
              title: book.volumeInfo.title,
              subtitle: book.volumeInfo.subtitle,
              categories: book.volumeInfo.categories,
              description: book.volumeInfo.description,
              imageLinks: {
                thumbnail: book.volumeInfo.imageLinks?.thumbnail,
              },
            }}
          />
        )
      )}
    </div>
  );
};

export default BookDetails;
