import { Link } from 'react-router-dom';
import Button from './Button';
import LazyLoad from 'react-lazy-load';
import { BookProps } from '../Types';
import { addBook, removeBook } from '../store/thunks/firebase';
import { useAppSelector } from '../store/hooks';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const BookCard = ({ data }: { data: BookProps }) => {
  const [buttonType, setButtonType] = useState<string>('Add');
  const { uid, savedBooks } = useAppSelector((state) => state.user);

  useEffect(() => {
    savedBooks?.some((book) => book.id === data.id) ? setButtonType('Remove') : setButtonType('Add');
  }, [savedBooks]);

  const handleClick = async (data: BookProps) => {
    if (uid) {
      buttonType === 'Add' ? await addBook(data) : await removeBook(data);
    } else {
      toast.error('Hold it right there! You should log in first.', {
        autoClose: 5000,
        toastId: 'login',
      });
    }
  };

  return (
    <div className="book-card">
      <Link to={`/book/${data.id}`} className="book-card-img">
        <LazyLoad height={180} threshold={0.35}>
          <img
            src={data.volumeInfo.imageLinks?.thumbnail || '/cover_not_available.jpeg'}
            alt={`Cover image of ${data.volumeInfo.title}`}
          />
        </LazyLoad>
      </Link>
      <div className="book-card-details">
        <Link to={`/book/${data.id}`} className="book-card-details-title truncate">
          {data.volumeInfo.title}
        </Link>
        <p className="book-card-details-authors truncate">{data.volumeInfo.authors?.join(', ')}</p>
        <i>
          <p className="book-card-details-publisher truncate">{data.volumeInfo.publisher}</p>
        </i>
      </div>

      <Button
        primary={buttonType === 'Add'}
        rounded
        fourth={buttonType === 'Remove'}
        className="book-card-btn"
        onClick={() =>
          handleClick({
            id: data.id,
            volumeInfo: {
              publisher: data.volumeInfo.publisher || '',
              title: data.volumeInfo.title || '',
              authors: data.volumeInfo.authors || [],
              imageLinks: {
                thumbnail: data.volumeInfo.imageLinks?.thumbnail || '',
              },
            },
          })
        }
      >
        {buttonType}
      </Button>
    </div>
  );
};

export default BookCard;
