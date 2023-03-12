import { BookDetailsProps } from '../Types';

export const parseDetailedData = async ({ data }: { data: BookDetailsProps }) => {
  const parsedData: BookDetailsProps[] = [];
  parsedData.push({
    id: data.id,
    volumeInfo: {
      pageCount: data.volumeInfo.pageCount,
      previewLink: data.volumeInfo.previewLink,
      publisher: data.volumeInfo.publisher,
      title: data.volumeInfo.title,
      authors: data.volumeInfo.authors,
      categories: data.volumeInfo.categories,
      description: data.volumeInfo.description,
      imageLinks: {
        thumbnail: data.volumeInfo.imageLinks?.thumbnail,
      },
      publishedDate: data.volumeInfo.publishedDate,
      subtitle: data.volumeInfo.subtitle,
    },
    accessInfo: {
      pdf: {
        downloadLink: data.accessInfo.pdf.downloadLink,
      },
    },
    saleInfo: {
      listPrice: {
        amount: data.saleInfo.listPrice?.amount,
        currencyCode: data.saleInfo.listPrice?.currencyCode,
      },
      retailPrice: {
        amount: data.saleInfo.retailPrice?.amount,
        currencyCode: data.saleInfo.retailPrice?.currencyCode,
      },
      saleability: data.saleInfo.saleability,
      buyLink: data.saleInfo.buyLink,
    },
  });
  return parsedData;
};
