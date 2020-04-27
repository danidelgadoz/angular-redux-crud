import { Book } from '../book';

export const featureKey = 'books';

export interface BooksState {
  action: string;
  data: Array<Book>;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialstate: BooksState = {
  action: null,
  data: [],
  loading: false,
  loaded: false,
  error: null,
};
