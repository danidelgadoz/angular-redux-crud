import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BooksState, featureKey } from './book.state';
import * as bookActions from './book.actions';

export const getBookState = createFeatureSelector<BooksState>(featureKey);

export const getAll = createSelector(getBookState, (state: BooksState) => [...state.data]);

export const getSelected = createSelector(getBookState, (state: BooksState, props: { id: string}) =>
  ({...state.data.find(book => book._id === props.id)})
);

export const isCreateSuccess = createSelector(getBookState, (state: BooksState) =>
  state.action === bookActions.type.CREATE_BOOK && !state.loading && !state.error);

export const isUpdateSuccess = createSelector(getBookState, (state: BooksState) =>
  state.action === bookActions.type.UPDATE_BOOK && !state.loading && !state.error);

export const isDeleteSuccess = createSelector(getBookState, (state: BooksState) =>
  state.action === bookActions.type.DELETE_BOOK && !state.loading && !state.error);
