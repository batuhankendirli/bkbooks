import { useCallback, useEffect, useMemo } from 'react';
import BookSlider from '../components/BookSlider';
import BookSliderSkeleton from '../components/BookSliderSkeleton';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchCategories } from '../store/thunks/fetchCategories';

const Categories = () => {
  const dispatch = useAppDispatch();
  const { books, isLoading } = useAppSelector((state) => state.categories);

  const categories = ['fiction', 'poetry', 'fantasy', 'romance', 'superheroes', 'science', 'art', 'biographies'];

  const fetchCategoryBooks = useCallback(
    async (category: string) => {
      await dispatch(fetchCategories({ query: category, maxResults: 10, findBy: 'subject', source: 'categories' }));
    },

    [dispatch]
  );

  useEffect(() => {
    const fetchAllCategories = async () => {
      for (let i = 0; i < categories.length; i++) {
        await fetchCategoryBooks(categories[i]);
      }
    };
    fetchAllCategories();
  }, [fetchCategoryBooks]);

  const showAllCategories = useMemo(() => {
    const fetchedCategories = books
      .map((book) => Object.keys(book))
      .flat()
      .filter((category, index, self) => self.indexOf(category) === index);
    return isLoading || fetchedCategories.length !== categories.length ? false : true;
  }, [isLoading, books, categories]);

  return (
    <div className="section-categories section-mt">
      <p className="section-categories-header">
        Don't know what to read? Here are some cool categories listed for you!
      </p>
      <div className="section-categories-slides">
        {isLoading && showAllCategories ? (
          <BookSliderSkeleton />
        ) : (
          <>
            {categories.map((category, index) => {
              const bookCategory = books.find((book) => book.hasOwnProperty(category));
              if (!bookCategory) return <BookSliderSkeleton key={index} />;
              const data = bookCategory[category];
              return <BookSlider category={category} data={data} key={index} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Categories;
