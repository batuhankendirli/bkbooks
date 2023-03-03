import { Link } from 'react-router-dom';
import Button from './Button';
import LazyLoad from 'react-lazy-load';
import { BookProps } from '../Types';

const BookCard = ({ data }: { data: BookProps }) => {
  return (
    <div className="book-card">
      <Link to={`/book/${data.id}`} className="book-card-img">
        <LazyLoad height={180} threshold={0.35}>
          <img src={data.volumeInfo.imageLinks?.thumbnail} alt={`Cover image of ${data.volumeInfo.title}`} />
        </LazyLoad>
      </Link>
      <div className="book-card-details">
        <Link to={`/book/${data.id}`} className="book-card-details-title truncate">
          {data.volumeInfo.title}
        </Link>
        <p className="book-card-details-authors truncate">{data.volumeInfo.authors?.join(', ')}</p>
        <i>
          <p className="book-card-details-publisher">{data.volumeInfo.publisher}</p>
        </i>
      </div>

      <Button primary rounded className="book-card-btn">
        Add
      </Button>
    </div>
  );
};

export default BookCard;
