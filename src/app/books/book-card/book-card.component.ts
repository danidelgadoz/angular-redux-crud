import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Book } from '../book';
import * as bookActions from '../store/book.actions';
import * as bookSelector from '../store/book.selectors';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit, OnDestroy {
  @Input() book: Book;
  @Output() deleted = new EventEmitter<string>();
  private bookStore$: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store<{ books }>
  ) {
    this.bookStore$ = new Subscription();
  }

  ngOnInit(): void {
    this.bookStore$.add(
      this.store.select(bookSelector.isDeleteSuccess)
        .pipe(filter(done => !!done))
        .subscribe(() => this.snackBar.open('Book deleted!', 'OK', { duration: 2000 })),
    );
  }

  ngOnDestroy(): void {
    this.bookStore$?.unsubscribe();
  }

  onChangeFavoriteState(): void {
    const bookFavoriteState = { favorite: !this.book.favorite };
    this.store.dispatch(bookActions.patchBook({ id: this.book._id, payload: bookFavoriteState }));
  }

  onClickRemoveBook(id: string): void {
    this.store.dispatch(bookActions.deleteBook({ id }));
  }

  onBookDetailNavigate(book: Book): void {
    this.router.navigate([book._id], { relativeTo: this.activatedRoute });
  }

}
