import BookDetailsCard from '../components/BookDetailsCard';
import { BookDetailsProps } from '../Types';
import books from '../books.json';
import BookDetailsCardSkeleton from '../components/BookDetailsCardSkeleton';

const BookDetails = () => {
  // const data: BookDetailsProps = {};

  return (
    <div className="section-details section-mt">
      {books.map((data) => {
        return (
          <BookDetailsCard
            key={data.id}
            id={data.id}
            accessInfo={{
              pdf: {
                downloadLink: data.accessInfo.pdf.downloadLink,
              },
            }}
            saleInfo={{
              buyLink: data.saleInfo.buyLink,
              saleability: data.saleInfo.saleability,
              listPrice: {
                amount: data.saleInfo.listPrice?.amount,
                currencyCode: data.saleInfo.listPrice?.currencyCode,
              },
              retailPrice: {
                amount: data.saleInfo.retailPrice?.amount,
                currencyCode: data.saleInfo.retailPrice?.currencyCode,
              },
            }}
            volumeInfo={{
              authors: data.volumeInfo.authors,
              pageCount: data.volumeInfo.pageCount,
              previewLink: data.volumeInfo.previewLink,
              publishedDate: data.volumeInfo.publishedDate,
              publisher: data.volumeInfo.publisher,
              title: data.volumeInfo.title,
              subtitle: data.volumeInfo.subtitle,
              categories: data.volumeInfo.categories,
              description: data.volumeInfo.description,
              imageLinks: {
                thumbnail: data.volumeInfo.imageLinks?.thumbnail,
              },
            }}
          />
        );
      })}
    </div>
  );
};

export default BookDetails;
