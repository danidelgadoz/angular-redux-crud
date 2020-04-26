import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BooksState, featureKey } from './book.state';
import * as bookActions from './book.actions';

export const getBookState = createFeatureSelector<BooksState>(featureKey);

export const isCreatedSuccess = createSelector(getBookState, (state: BooksState) =>
  state.action === bookActions.type.CREATE_BOOK && !state.loading && !state.error);

export const getCreatedError = createSelector(getBookState, (state: BooksState) =>
  state.action === bookActions.type.CREATE_BOOK ? state.error : null);

export const getBookSelected = createSelector(getBookState, (state: BooksState, props) => {
  return state.data.find(book => book._id === props.id);
});
