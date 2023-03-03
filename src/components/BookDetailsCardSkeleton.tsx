import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BookDetailsCardSkeleton = () => {
  return (
    <div className="details-skeleton">
      <Skeleton className="details-skeleton-title" containerClassName="skeleton-container" />
      <div className="details-skeleton-container">
        <div className="details-skeleton-container-left">
          <Skeleton className="details-skeleton-container-left-img" containerClassName="skeleton-container" />
          <Skeleton className="details-skeleton-container-left-button" containerClassName="skeleton-container" />
        </div>
        <div className="details-skeleton-container-right">
          <div>
            <Skeleton className="details-skeleton-container-right-header" containerClassName="skeleton-container" />
            <Skeleton className="details-skeleton-container-right-text" containerClassName="skeleton-container" />
          </div>
          <Skeleton className="details-skeleton-container-right-p" count={15} />
          <div className="details-skeleton-container-right-buttons">
            <Skeleton
              className="details-skeleton-container-right-buttons-button"
              containerClassName="skeleton-container"
            />
            <Skeleton
              className="details-skeleton-container-right-buttons-button"
              containerClassName="skeleton-container"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsCardSkeleton;
