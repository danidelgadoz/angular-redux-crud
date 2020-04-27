export type BookId = '_id';

export interface Book {
  _id: string;
  author: string;
  description: string;
  favorite: boolean;
  posterImgPath: string;
  title: string;
}
