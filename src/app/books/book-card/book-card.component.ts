import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Book } from '../book';
import { BookService } from '../book.service';
import * as bookActions from '../store/book.actions';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit, OnDestroy {
  @Input() book: Book;
  @Output() deleted = new EventEmitter<string>();
  private bookDeleteApi$: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookService: BookService,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store<{ books }>
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.bookDeleteApi$?.unsubscribe();
  }

  onChangeFavoriteState(): void {
    const bookFavoriteState = { favorite: !this.book.favorite };
    this.store.dispatch(bookActions.patchBook({ id: this.book._id, payload: bookFavoriteState }));
  }

  onClickRemoveBook(id: string): void {
    this.bookDeleteApi$ = this.bookService
      .delete(id)
      .subscribe(() => {
        this.deleted.emit(id); // to refresh list on catalog
        this.snackBar.open('Book deleted!', 'OK', { duration: 2000 });
      });
  }

  onBookDetailNavigate(book: Book): void {
    this.router.navigate([book._id], { relativeTo: this.activatedRoute });
  }

}
