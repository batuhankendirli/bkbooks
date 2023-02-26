import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BookCardSkeleton = () => {
  return (
    <div className="book-card-skeleton">
      <Skeleton className="book-card-skeleton-img" />
      <div className="book-card-skeleton-details">
        <Skeleton className="book-card-skeleton-details-title truncate" />
        <Skeleton className="book-card-skeleton-details-authors" />
        <Skeleton className="book-card-skeleton-details-publisher" />
      </div>

      <Skeleton className="book-card-skeleton-btn" />
    </div>
  );
};

export default BookCardSkeleton;
