import { createAction, props } from '@ngrx/store';
import { Book } from '../book';

export enum type {
  LOAD_BOOKS              = '[ Book ] Load Books',
  LOAD_BOOKS_FAIL         = '[ Book ] Load Books Fail',
  LOAD_BOOKS_SUCCESS      = '[ Book ] Load Books Success',
  LOAD_BOOK_BY_ID         = '[ Book ] Load Book',
  LOAD_BOOK_BY_ID_FAIL    = '[ Book ] Load Book Fail',
  LOAD_BOOK_BY_ID_SUCCESS = '[ Book ] Load Book Success',
  CREATE_BOOK             = '[ Book ] Create Book',
  CREATE_BOOK_FAIL        = '[ Book ] Create Book Fail',
  CREATE_BOOK_SUCCESS     = '[ Book ] Create Book Success',
  UPDATE_BOOK             = '[ Book ] Update Book',
  UPDATE_BOOK_FAIL        = '[ Book ] Update Book Fail',
  UPDATE_BOOK_SUCCESS     = '[ Book ] Update Book Success',
  PATCH_BOOK              = '[ Book ] Patch Book',
  PATCH_BOOK_FAIL         = '[ Book ] Patch Book Fail',
  PATCH_BOOK_SUCCESS      = '[ Book ] Patch Book Success',
}

export const loadBooks           = createAction(type.LOAD_BOOKS);
export const loadBooksFail       = createAction(type.LOAD_BOOKS_FAIL, props<{ error: any }>());
export const loadBooksSuccess    = createAction(type.LOAD_BOOKS_SUCCESS, props<{ data: Array<Book> }>());
export const loadBookById        = createAction(type.LOAD_BOOK_BY_ID, props<{ payload: string }>());
export const loadBookByIdFail    = createAction(type.LOAD_BOOK_BY_ID_FAIL, props<{ error: any }>());
export const loadBookByIdSuccess = createAction(type.LOAD_BOOK_BY_ID_SUCCESS, props<{ payload: Book }>());
export const createBook          = createAction(type.CREATE_BOOK, props<{ payload: Partial<Book> }>());
export const createBookFail      = createAction(type.CREATE_BOOK_FAIL, props<{ error: any }>());
export const createBookSuccess   = createAction(type.CREATE_BOOK_SUCCESS, props<{ payload: Book }>());
export const updateBook          = createAction(type.UPDATE_BOOK, props<{ payload: Book }>());
export const updateBookFail      = createAction(type.UPDATE_BOOK_FAIL, props<{ error: any }>());
export const updateBookSuccess   = createAction(type.UPDATE_BOOK_SUCCESS, props<{ payload: Book }>());
export const patchBook           = createAction(type.PATCH_BOOK, props<{ id: string, payload: Partial<Book> }>());
export const patchBookFail       = createAction(type.PATCH_BOOK_FAIL, props<{ error: any }>());
export const patchBookSuccess    = createAction(type.PATCH_BOOK_SUCCESS, props<{ payload: Book }>());
