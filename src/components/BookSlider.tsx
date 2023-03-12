import BookCard from './BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';

import { FreeMode } from 'swiper';
import { BookProps } from '../Types';

const BookSlider = ({ category, data }: { category: string; data: BookProps[] }) => {
  return (
    <div className="book-slider">
      <h1 className="book-slider-header">{category}</h1>
      <Swiper
        spaceBetween={10}
        modules={[FreeMode]}
        slidesPerView="auto"
        freeMode={true}
        touchEventsTarget="container"
        style={{
          padding: '1.2rem .8rem',
        }}
      >
        {data.map((book, index) => {
          return (
            <SwiperSlide className="book-slider-slide" key={book.id}>
              <BookCard
                data={{
                  id: book.id,
                  volumeInfo: {
                    authors: book.volumeInfo.authors,
                    publisher: book.volumeInfo.publisher,
                    title: book.volumeInfo.title,
                    imageLinks: {
                      thumbnail: book.volumeInfo.imageLinks?.thumbnail,
                    },
                  },
                }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default BookSlider;
