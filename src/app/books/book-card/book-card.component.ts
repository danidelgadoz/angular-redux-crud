import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  @Input() book!: Book;
  private bookStore$: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store
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
    const fieldsToUpdate = { favorite: !this.book.favorite };
    this.store.dispatch(bookActions.patchBook({ id: this.book._id, book: fieldsToUpdate }));
  }

  onClickRemoveBook(id: string): void {
    this.store.dispatch(bookActions.deleteBook({ id }));
  }

  onBookDetailNavigate(book: Book): void {
    this.router.navigate([book._id], { relativeTo: this.activatedRoute });
  }

}
