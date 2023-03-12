import { useEffect } from 'react';
import BookSlider from '../components/BookSlider';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchBooks } from '../store/thunks/fetchBooks';

const Categories = () => {
  const dispatch = useAppDispatch();
  const { books, isLoading } = useAppSelector((state) => state.categories);

  const categories = ['fiction', 'poetry', 'fantasy', 'romance', 'superheroes', 'science', 'art', 'biographies'];

  useEffect(() => {
    categories.forEach((category) => dispatch(fetchBooks({ query: category, maxResults: 10, findBy: 'subject' })));
  }, [dispatch]);

  return (
    <div className="section-categories section-mt">
      <p className="section-categories-header">
        Don't know what to read? Here are some cool categories listed for you!
      </p>
      <div className="section-categories-slides">
        {books.map((book, index) => (
          <BookSlider category={categories[index]} data={book} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
