import { Action, createReducer, on } from '@ngrx/store';
import * as bookState from './book.state';
import * as bookActions from './book.actions';

const bookReducer = createReducer(
  bookState.initialstate,
  // FIND ALL
  on(bookActions.findAllBooks, (state) => ({
    ...state,
    action: bookActions.type.FIND_ALL_BOOKS,
    loading: true,
    error: null,
  })),
  on(bookActions.findAllBooksSuccess, (state, { books }) => ({
    ...state,
    data: [...books],
    loading: false,
  })),
  on(bookActions.findAllBooksFail, (state, { error }) => ({
    ...state,
    error: {...error},
    loading: false,
  })),
  // FIND ONE
  on(bookActions.findOneBook, (state) => ({
    ...state,
    action: bookActions.type.FIND_ONE_BOOK,
    loading: true,
    error: null,
  })),
  on(bookActions.findOneSuccess, (state, { book }) => {
    const booksOnState = [...state.data];
    const index = booksOnState.findIndex(b => b._id === book._id);
    if (index === -1) {
      booksOnState.push(book);
    } else {
      booksOnState[index] = book;
    }
    return ({
      ...state,
      data: booksOnState,
      loading: false,
    });
  }),
  on(bookActions.findOneBookFail, (state, { error }) => ({
    ...state,
    error: { ...error },
    loading: false,
  })),
  // CREATE
  on(bookActions.createBook, (state) => ({
    ...state,
    action: bookActions.type.CREATE_BOOK,
    loading: true,
    error: null,
  })),
  on(bookActions.createBookSuccess, (state, { book }) => ({
    ...state,
    data: [...state.data, book],
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
  on(bookActions.updateBookSuccess, (state, { book }) => {
    const booksOnState = [...state.data];
    const index = booksOnState.findIndex(b => b._id === book._id);
    booksOnState[index] = book;
    return ({
      ...state,
      data: booksOnState,
      loading: false,
    });
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
  on(bookActions.patchBookSuccess, (state, { book }) => {
    const booksOnState = [...state.data];
    const index = booksOnState.findIndex(b => b._id === book._id);
    booksOnState[index] = book;
    return ({
      ...state,
      data: booksOnState,
      loading: false,
    });
  }),
  on(bookActions.patchBookFail, (state, { error }) => ({
    ...state,
    error: { ...error },
    loading: false,
  })),
  // DELETE
  on(bookActions.deleteBook, (state) => ({
    ...state,
    action: bookActions.type.DELETE_BOOK,
    loading: true,
    error: null,
  })),
  on(bookActions.deleteBookSuccess, (state, { id }) => ({
    ...state,
    data: [...state.data].filter(b => b._id !== id),
    loading: false,
  })),
  on(bookActions.patchBookFail, (state, { error }) => ({
    ...state,
    error: { ...error },
    loading: false,
  })),
);

export function reducer(state: bookState.BooksState, action: Action) {
  return bookReducer(state, action);
}
