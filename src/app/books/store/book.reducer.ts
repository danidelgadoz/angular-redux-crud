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
  // GetOneByID
  on(bookActions.loadBookById, (state) => ({
    ...state,
    action: bookActions.type.LOAD_BOOK_BY_ID,
    loading: true,
    error: null,
  })),
  on(bookActions.loadBookByIdSuccess, (state, { payload }) => {
    const books = [...state.data];
    const index = books.findIndex(b => b._id === payload._id);
    if (index === -1) {
      books.push(payload);
    } else {
      books[index] = payload;
    }
    return ({
      ...state,
      data: books,
      loading: false,
    });
  }),
  on(bookActions.loadBookByIdFail, (state, { error }) => ({
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
  // UPDATE
  on(bookActions.updateBook, (state) => ({
    ...state,
    action: bookActions.type.UPDATE_BOOK,
    loading: true,
    error: null,
  })),
  on(bookActions.updateBookSuccess, (state, { payload }) => {
    const books = [...state.data];
    const index = books.findIndex(b => b._id === payload._id);
    books[index] = payload;
    return ({
      ...state,
      data: books,
      loading: false,
    })
  }),
  on(bookActions.updateBookFail, (state, { error }) => ({
    ...state,
    error: { ...error },
    loading: false,
  })),
  // PATCH
  on(bookActions.patchBook, (state) => ({
    ...state,
    action: bookActions.type.PATCH_BOOK,
    loading: true,
    error: null,
  })),
  on(bookActions.patchBookSuccess, (state, { payload }) => {
    const books = [...state.data];
    const index = books.findIndex(b => b._id === payload._id);
    books[index] = payload;
    return ({
      ...state,
      data: books,
      loading: false,
    })
  }),
  on(bookActions.patchBookFail, (state, { error }) => ({
    ...state,
    error: { ...error },
    loading: false,
  })),
);

export function reducer(state: bookState.BooksState, action: Action) {
  return bookReducer(state, action);
}
