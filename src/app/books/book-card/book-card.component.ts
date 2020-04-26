import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit, OnDestroy {
  @Input() book: Book;
  @Output() deleted = new EventEmitter<string>();
  private bookPartialUpdateApi$: Subscription;
  private bookDeleteApi$: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookService: BookService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.bookPartialUpdateApi$?.unsubscribe();
    this.bookDeleteApi$?.unsubscribe();
  }

  onChangeFavoriteState(): void {
    const bookFavoriteState = { favorite: !this.book.favorite };

    this.bookPartialUpdateApi$ = this.bookService
      .partialUpdate(this.book._id, bookFavoriteState)
      .subscribe(({ favorite }) => {
        this.book = {...this.book, favorite };
      });
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
