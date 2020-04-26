import { createReducer, on, Action } from '@ngrx/store';
import * as bookState from './book.state';
import * as bookActions from './book.actions';

const bookReducer = createReducer(
  bookState.initialstate,
  on(bookActions.loadBooks, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(bookActions.loadBooksSuccess, (state, { data }) => ({
    ...state,
    data,
    loading: false,
  })),
  on(bookActions.loadBooksFail, (state, { error }) => ({
    ...state,
    error: { ...error },
    loading: false,
  })),
);

export function reducer(state: bookState.BooksState, action: Action) {
  return bookReducer(state, action);
}
