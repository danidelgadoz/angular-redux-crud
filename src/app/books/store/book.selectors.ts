import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BooksState, featureKey, adapter } from './book.state';
import * as bookActions from './book.actions';

const {
  selectEntities,
  selectAll
} = adapter.getSelectors();

const getBookState = createFeatureSelector<BooksState>(featureKey);

const selectBookEntities = createSelector(getBookState, selectEntities);

const selectBookSensorId = createSelector(getBookState, (state: BooksState) => state.selectedId);

export const selectAllBooks = createSelector(getBookState, selectAll);

export const selectCurrentBook = createSelector(
  selectBookEntities,
  selectBookSensorId,
  (userEntities, userId) => userId && userEntities[userId]
);

export const isCreateSuccess = createSelector(getBookState, (state: BooksState) =>
  state.action === bookActions.type.CREATE_BOOK && !state.loading && !state.error);

export const isUpdateSuccess = createSelector(getBookState, (state: BooksState) =>
  state.action === bookActions.type.UPDATE_BOOK && !state.loading && !state.error);

export const isDeleteSuccess = createSelector(getBookState, (state: BooksState) =>
  state.action === bookActions.type.DELETE_BOOK && !state.loading && !state.error);
