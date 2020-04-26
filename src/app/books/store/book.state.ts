import { Book } from '../book';

export const featureKey = 'books';

export interface BooksState {
  data: Array<Book>;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialstate: BooksState = {
  data: [],
  loading: false,
  loaded: false,
  error: null,
};
