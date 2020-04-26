import { createAction, props } from '@ngrx/store';
import { Book } from '../book';

export enum type {
  LOAD_BOOKS          = '[ Book ] Load Book',
  LOAD_BOOKS_FAIL     = '[ Book ] Load Book Fail',
  LOAD_BOOKS_SUCCESS  = '[ Book ] Load Book Success',
  CREATE_BOOK         = '[ Book ] Create Book',
  CREATE_BOOK_FAIL    = '[ Book ] Create Book Fail',
  CREATE_BOOK_SUCCESS = '[ Book ] Create Book Success',
}

export const loadBooks         = createAction(type.LOAD_BOOKS);
export const loadBooksFail     = createAction(type.LOAD_BOOKS_FAIL, props<{ error: any }>());
export const loadBooksSuccess  = createAction(type.LOAD_BOOKS_SUCCESS, props<{ data: Array<Book> }>());
export const createBook        = createAction(type.CREATE_BOOK, props<{ payload: Partial<Book> }>());
export const createBookFail    = createAction(type.CREATE_BOOK_FAIL, props<{ error: any }>());
export const createBookSuccess = createAction(type.CREATE_BOOK_SUCCESS, props<{ payload: Book }>());
