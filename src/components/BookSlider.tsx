import BookCard from './BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';

import { FreeMode } from 'swiper';

const BookSlider = ({ category }: { category: string }) => {
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
        {Array(10)
          .fill(0)
          .map((_, index) => {
            return (
              <SwiperSlide className="book-slider-slide" key={index}>
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
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default BookSlider;
