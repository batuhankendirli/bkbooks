import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import BookCardSkeleton from './BookCardSkeleton';
import { Swiper, SwiperSlide } from 'swiper/react';

const BookSliderSkeleton = () => {
  return (
    <div className="book-slider-skeleton">
      <Skeleton className="book-slider-skeleton-header" />

      <div className="book-slider-skeleton-slider">
        <Swiper
          spaceBetween={10}
          slidesPerView="auto"
          freeMode={true}
          touchEventsTarget="container"
          style={{
            padding: '1.2rem .8rem',
          }}
        >
          {Array(10)
            .fill(0)
            .map((_, index) => {
              return (
                <SwiperSlide className="book-slider-slide" key={index}>
                  <BookCardSkeleton />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default BookSliderSkeleton;
