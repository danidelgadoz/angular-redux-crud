import { createReducer, on, Action } from '@ngrx/store';
import * as bookState from './book.state';
import * as bookActions from './book.actions';

const bookReducer = createReducer(
  bookState.initialstate,
  // GetAll
  on(bookActions.loadBooks, (state) => ({
    ...state,
    action: bookActions.type.LOAD_BOOKS,
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
  // Create
  on(bookActions.createBook, (state) => ({
    ...state,
    action: bookActions.type.CREATE_BOOK,
    loading: true,
    error: null,
  })),
  on(bookActions.createBookSuccess, (state, { payload }) => ({
    ...state,
    data: [...state.data, payload],
    loading: false,
  })),
  on(bookActions.createBookFail, (state, { error }) => ({
    ...state,
    error: { ...error },
    loading: false,
  })),
);

export function reducer(state: bookState.BooksState, action: Action) {
  return bookReducer(state, action);
}
