import { Action, createReducer, on } from '@ngrx/store';
import * as bookState from './book.state';
import * as bookActions from './book.actions';

const bookReducer = createReducer(
  bookState.initialstate,
  // SELECT ONE
  on(bookActions.SelectBook, (state, { id }) => ({
    ...state,
    selectedId: id
  })),
  // FIND ALL
  on(bookActions.findAllBooks, (state) => ({
    ...state,
    action: bookActions.type.FIND_ALL_BOOKS,
    loading: true,
    error: null,
  })),
  on(bookActions.findAllBooksSuccess, (state, { books }) => {
    return bookState.adapter.addMany(books, {
      ...state,
      loading: false,
    });
  }),
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
    return bookState.adapter.setOne(book, {
      ...state,
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
  on(bookActions.createBookSuccess, (state, { book }) => {
    return bookState.adapter.addOne(book, {
      ...state,
      loading: false,
    });
  }),
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
    return bookState.adapter.updateOne({ id: book._id, changes: book }, {
      ...state,
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
    return bookState.adapter.updateOne({ id: book._id, changes: book }, {
      ...state,
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
  on(bookActions.deleteBookSuccess, (state, { id }) => {
    return bookState.adapter.removeOne(id, {
      ...state,
      loading: false,
    });
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
