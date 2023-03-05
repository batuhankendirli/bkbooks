import BookCard from '../components/BookCard';
import Search from '../components/Search';
import books from '../books.json';

const MyBooks = () => {
  return (
    <div className="section-my-books section-mt">
      <h1 className="section-my-books-header">
        Hello<span className="section-my-books-header-name"> Batuhan</span>, here are your books!
      </h1>
      <Search placeholder="Search inside your books..." />
      <div className="books-wrapper">
        {Array(20)
          .fill(0)
          .map((book) => {
            return <BookCard data={books[0]} />;
          })}
      </div>
    </div>
  );
};

export default MyBooks;
