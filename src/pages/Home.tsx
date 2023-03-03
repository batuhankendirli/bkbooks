import Search from '../components/Search';
import BookCard from '../components/BookCard';
import BookCardSkeleton from '../components/BookCardSkeleton';

const Home = () => {
  return (
    <div className="section-home section-mt">
      <Search placeholder="Search your favorite books..." />
      <div className="books-wrapper">
        {Array(40)
          .fill(0)
          .map((_, index) => (
            <BookCard
              data={{
                id: String(index),
                volumeInfo: {
                  authors: ['Batuhan Kendirli', 'Batuhan Kendirli'],
                  publisher: 'Something',
                  title: 'Test test test',
                  imageLinks: {
                    thumbnail:
                      'https://publications.iarc.fr/uploads/media/default/0001/02/thumb_1203_default_publication.jpeg',
                  },
                },
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
