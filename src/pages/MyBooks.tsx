import BookCard from '../components/BookCard';
import BookCardSkeleton from '../components/BookCardSkeleton';
import Search from '../components/Search';
import { useAppSelector } from '../store/hooks';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import NoResult from '../components/NoResult';

const MyBooks = () => {
  const { displayName, savedBooks, isLoading } = useAppSelector((state) => state.user);
  const [parent] = useAutoAnimate();
  const { searchTerm } = useAppSelector((state) => state.homepage);

  const filteredBooks = savedBooks?.filter(
    (book) =>
      book.volumeInfo.title.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      book.volumeInfo.authors?.join(' ').toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <div className="section-my-books section-mt">
      <h1 className="section-my-books-header">
        Hello<span className="section-my-books-header-name">{displayName ? ` ${displayName}` : ''}</span>, here are your
        books!
      </h1>
      <Search placeholder="Search inside your books..." disabled={savedBooks?.length === 0 ? true : false} />
      {!isLoading && filteredBooks && (
        <div className="books-wrapper" ref={parent}>
          {filteredBooks?.length > 0 ? (
            filteredBooks?.map((book) => <BookCard key={book.id} data={book} />)
          ) : (
            <NoResult
              header="¯\_(ツ)_/¯"
              text={
                searchTerm
                  ? "We couldn't find any books matching your search. Please try again with a different search term."
                  : "You haven't saved any books yet. Once you've saved a book, it will appear here. You can add books by searching for them on our site and clicking the 'Add' button. Happy reading!"
              }
            />
          )}
        </div>
      )}

      {isLoading && (
        <div className="books-wrapper">
          {Array(12)
            .fill(0)
            .map((_, index) => (
              <BookCardSkeleton key={index} />
            ))}
        </div>
      )}
    </div>
  );
};

export default MyBooks;
