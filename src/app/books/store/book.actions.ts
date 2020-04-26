import { createAction, props } from '@ngrx/store';
import { Book } from '../book';

const LOAD_BOOKS          = '[ Book ] Load Book';
const LOAD_BOOKS_FAIL     = '[ Book ] Load Book Fail';
const LOAD_BOOKS_SUCCESS  = '[ Book ] Load Book Success';

export const loadBooks = createAction(LOAD_BOOKS);
export const loadBooksFail = createAction(LOAD_BOOKS_FAIL, props<{ error: any }>());
export const loadBooksSuccess = createAction(LOAD_BOOKS_SUCCESS, props<{ data: Array<Book> }>());
