import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { BookService } from '../book.service';
import * as bookActions from './book.actions';

@Injectable()
export class BookEffects {

  findAllBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.findAllBooks),
      switchMap(() =>
        this.bookService.findAll().pipe(
          map((books) => bookActions.findAllBooksSuccess({ books })),
          catchError((error) => of(bookActions.findAllBooksFail({ error })))
        )
      )
    )
  );

  findOneById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.findOneBook),
      switchMap((action) =>
        this.bookService.findById(action.id).pipe(
          map((book) => bookActions.findOneSuccess({ book })),
          catchError((error) => of(bookActions.findOneBookFail({ error })))
        )
      )
    )
  );

  createBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.createBook),
      switchMap((action) =>
        this.bookService.create(action.book).pipe(
          map((book) => bookActions.createBookSuccess({ book })),
          catchError((error) => of(bookActions.createBookFail({ error })))
        )
      )
    )
  );

  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.updateBook),
      switchMap((action) =>
        this.bookService.update(action.book).pipe(
          map((book) => bookActions.updateBookSuccess({ book })),
          catchError((error) => of(bookActions.updateBookFail({ error })))
        )
      )
    )
  );

  patchBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.patchBook),
      switchMap((action) =>
        this.bookService.partialUpdate(action.id, action.book).pipe(
          map((book) => bookActions.patchBookSuccess({ book })),
          catchError((error) => of(bookActions.patchBookFail({ error })))
        )
      )
    )
  );

  deleteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.deleteBook),
      switchMap((action) =>
        this.bookService.delete(action.id).pipe(
          map(() => bookActions.deleteBookSuccess({ id: action.id })),
          catchError((error) => of(bookActions.deleteBookFail({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private bookService: BookService
  ) {}
}
