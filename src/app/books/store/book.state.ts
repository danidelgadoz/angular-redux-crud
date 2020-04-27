import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Book } from '../book';

export const adapter = createEntityAdapter<Book>({
  selectId: (sensor: Book) => sensor._id,
  sortComparer: false
});

export interface BooksState extends EntityState<Book> {
  selectedId: string | null;
  action: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialstate: BooksState = adapter.getInitialState({
  selectedId: null,
  action: null,
  loading: false,
  loaded: false,
  error: null
});

export const featureKey = 'books';
