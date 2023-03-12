import Search from '../components/Search';
import BookCard from '../components/BookCard';
import BookCardSkeleton from '../components/BookCardSkeleton';
import { fetchBooks } from '../store/thunks/fetchBooks';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const Home = () => {
  const dispatch = useAppDispatch();
  const { books, error, isLoading, findBy, searchTerm, orderBy, printType } = useAppSelector((state) => state.homepage);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      dispatch(fetchBooks({ query: searchTerm, findBy, orderBy, printType }));
    }
    if (!searchTerm) {
      dispatch(fetchBooks({ query: 'sailing', findBy, orderBy, printType }));
    }
  }, [dispatch, findBy, searchTerm]);

  const handleFilterResults = () => {
    if (searchTerm.length >= 3) {
      dispatch(fetchBooks({ query: searchTerm, findBy, orderBy, printType }));
    }
    if (!searchTerm) {
      dispatch(fetchBooks({ query: 'sailing', findBy, orderBy, printType }));
    }
  };

  return (
    <div className="section-home section-mt">
      <Search placeholder="Search your favorite books..." advanced handleSave={handleFilterResults} />
      <div className="books-wrapper">
        {isLoading ? (
          Array(40)
            .fill(0)
            .map((_, index) => <BookCardSkeleton key={index} />)
        ) : (
          <>
            {books.map((item) => (
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
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
