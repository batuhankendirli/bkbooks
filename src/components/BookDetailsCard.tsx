import { Link } from 'react-router-dom';
import { BookDetailsProps } from '../Types';
import { FaGooglePlay } from 'react-icons/fa';
import { SiAdobeacrobatreader } from 'react-icons/si';
import Button from './Button';
import ReadMore from 'read-more-less-react';
import 'read-more-less-react/dist/index.css';

const BookDetailsCard = (data: BookDetailsProps) => {
  let discountedAmunt: number | null = null;
  let listAmount: number | null = null;

  if (data.saleInfo.listPrice && data.saleInfo.retailPrice) {
    discountedAmunt = data.saleInfo.retailPrice.amount;
    listAmount = data.saleInfo.listPrice.amount;
  }

  let hasDiscount: boolean = false;

  if (discountedAmunt && listAmount) {
    hasDiscount = listAmount > discountedAmunt;
  }

  let priceText: string | null = null;

  if (discountedAmunt && listAmount) {
    priceText = hasDiscount
      ? `${data.saleInfo.retailPrice?.currencyCode} ${data.saleInfo.retailPrice?.amount}`
      : `${data.saleInfo.listPrice?.currencyCode} ${data.saleInfo.listPrice?.amount}`;
  }

  /* const priceText =
    data.saleInfo.listPrice?.amount && data.saleInfo.retailPrice?.amount
      ? data.saleInfo.listPrice?.amount > data.saleInfo.retailPrice?.amount
        ? `${data.saleInfo.retailPrice?.currencyCode} ${data.saleInfo.retailPrice?.amount}`
        : `${data.saleInfo.listPrice?.currencyCode} ${data.saleInfo.listPrice?.amount}`
      : ''; */

  return (
    <div className="details">
      <h1 className="details-title">
        {data.volumeInfo.subtitle ? `${data.volumeInfo.title}:` : data.volumeInfo.title}{' '}
        <span>{data.volumeInfo.subtitle}</span>
      </h1>
      <div className="details-container">
        <div className="details-container-left">
          <div className="details-container-left-container">
            <img
              src={data.volumeInfo.imageLinks?.thumbnail || '/cover_not_available.jpeg'}
              alt={`Cover image of ${data.volumeInfo.title}`}
              className="details-container-left-container-img"
            />
          </div>

          <div className="details-container-left-buttons">
            {data.saleInfo.saleability !== 'NOT_FOR_SALE' && data.saleInfo.buyLink && (
              <Link to={data.saleInfo.buyLink} target="_blank">
                <Button tertiary>
                  {data.saleInfo.listPrice?.amount && data.saleInfo.retailPrice?.amount
                    ? data.saleInfo.listPrice?.amount > data.saleInfo.retailPrice?.amount && (
                        <span>
                          {data.saleInfo.listPrice?.currencyCode} {data.saleInfo.listPrice?.amount}{' '}
                        </span>
                      )
                    : null}
                  {priceText
                    ? `${data.saleInfo.retailPrice?.currencyCode} ${data.saleInfo.retailPrice?.amount} Buy`
                    : 'Get for free'}
                </Button>
              </Link>
            )}
            {data.saleInfo.saleability === 'FREE' && data.accessInfo.pdf.downloadLink && (
              <Link to={data.accessInfo.pdf.downloadLink} target="_blank">
                <Button fourth>
                  <SiAdobeacrobatreader /> Download PDF
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="details-container-right">
          <div>
            <p className="details-container-right-author">{data.volumeInfo.authors?.join(', ')}</p>
            <p className="details-container-right-info">
              {data.volumeInfo.publisher}
              {data.volumeInfo.publisher && data.volumeInfo.publishedDate && ', '}
              {data.volumeInfo.publishedDate} - {data.volumeInfo.categories && `${data.volumeInfo.categories?.[0]} - `}
              {`${data.volumeInfo.pageCount} pages`}
            </p>
          </div>

          {data.volumeInfo.description && (
            <ReadMore
              type="html"
              text={data.volumeInfo.description}
              lines={10}
              readLessText="Read less &laquo;"
              readMoreText="Read more &raquo;"
            />
          )}

          <div className="details-container-right-buttons">
            <Link to={data.volumeInfo.previewLink} target="_blank">
              <Button primary>
                <FaGooglePlay />
                Google Books
              </Button>
            </Link>

            <Button secondary>Add to my books</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsCard;
