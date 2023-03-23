import Search from '../components/Search';
import BookCard from '../components/BookCard';
import BookCardSkeleton from '../components/BookCardSkeleton';
import { fetchBooks } from '../store/thunks/fetchBooks';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import axios from 'axios';
import NoResult from '../components/NoResult';

const Home = () => {
  const dispatch = useAppDispatch();
  const { books, isLoading, findBy, searchTerm, orderBy, printType } = useAppSelector((state) => state.homepage);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    if (searchTerm.length >= 3) {
      dispatch(fetchBooks({ query: searchTerm, findBy, orderBy, printType, source: 'homepage' }));
    } else if (!searchTerm) {
      dispatch(fetchBooks({ query: 'sailing', findBy, orderBy, printType, source: 'homepage' }));
    }

    return () => {
      cancelToken.cancel();
    };
  }, [dispatch, findBy, searchTerm]);

  const handleFilterResults = () => {
    if (searchTerm.length >= 3) {
      dispatch(fetchBooks({ query: searchTerm, findBy, orderBy, printType, source: 'homepage' }));
    } else if (!searchTerm) {
      dispatch(fetchBooks({ query: 'sailing', findBy, orderBy, printType, source: 'homepage' }));
    }
  };

  return (
    <div className="section-home section-mt">
      <Search placeholder="Search your favorite books..." advanced handleSave={handleFilterResults} />

      {!isLoading && books && (
        <div className="books-wrapper">
          {books.length > 0 ? (
            books.map((item) => (
              <BookCard
                key={item.id}
                data={{
                  id: item.id,
                  volumeInfo: {
                    authors: item.volumeInfo.authors,
                    publisher: item.volumeInfo.publisher,
                    title: item.volumeInfo.title,
                    imageLinks: {
                      thumbnail: item.volumeInfo.imageLinks?.thumbnail,
                    },
                  },
                }}
              />
            ))
          ) : (
            <NoResult
              header="¯\_(ツ)_/¯"
              text="We're sorry, but we couldn't find any results for your search. It looks like the book you're looking for is not available in our database at the moment. Please try again with a different search term or check back with us later, as we are constantly updating our database with new titles."
            />
          )}
        </div>
      )}

      <div className="books-wrapper">
        {isLoading &&
          Array(40)
            .fill(0)
            .map((_, index) => <BookCardSkeleton key={index} />)}
      </div>
    </div>
  );
};

export default Home;
