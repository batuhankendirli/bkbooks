import { BookProps } from '../Types';

export const parseData = async (data: any) => {
  const parsedData: BookProps[] = [];
  data.data.items.forEach((item: BookProps) =>
    parsedData.push({
      id: item.id,
      volumeInfo: {
        publisher: item.volumeInfo.publisher,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        imageLinks: {
          thumbnail: item.volumeInfo.imageLinks?.thumbnail,
        },
      },
    })
  );

  return parsedData;
};
