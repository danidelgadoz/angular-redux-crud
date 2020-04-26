import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { Book } from '../book';
import { BookService } from '../book.service';
import * as bookActions from './book.actions';

@Injectable()
export class BookEffects {

  loadBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.loadBooks),
      switchMap(() =>
        this.bookService.findAll().pipe(
          map((data: Array<Book>) => bookActions.loadBooksSuccess({ data })),
          catchError((error: any) => of(bookActions.loadBooksFail({ error })))
        )
      )
    )
  );

  loadBookById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.loadBookById),
      switchMap((action: any) =>
        this.bookService.findById(action.payload).pipe(
          map((payload: Book) => bookActions.loadBookByIdSuccess({ payload })),
          catchError((error: any) => of(bookActions.loadBookByIdFail({ error })))
        )
      )
    )
  );

  createBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.createBook),
      switchMap((action: any) =>
        this.bookService.create(action.payload).pipe(
          map((payload: Book) => bookActions.createBookSuccess({ payload })),
          catchError((error: any) => of(bookActions.createBookFail({ error })))
        )
      )
    )
  );

  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.updateBook),
      switchMap((action: any) =>
        this.bookService.update(action.payload._id, action.payload).pipe(
          map((payload: Book) => bookActions.updateBookSuccess({ payload })),
          catchError((error: any) => of(bookActions.updateBookFail({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private bookService: BookService
  ) {}
}
