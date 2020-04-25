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
  private partialUpdate$: Subscription;
  private deleteBookApi$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.partialUpdate$?.unsubscribe();
    this.deleteBookApi$?.unsubscribe();
  }

  onUpdateFavoriteState(): void {
    const updatedBook = { ...this.book, favorite: !this.book.favorite };

    this.partialUpdate$ = this.bookService
      .partialUpdate(this.book._id, updatedBook)
      .subscribe(({ favorite }) => {
        this.book = {...this.book, favorite };
      });
  }

  onClickRemoveBook(id: string): void {
    this.deleteBookApi$ = this.bookService
      .delete(id)
      .subscribe(() => {
        this.deleted.emit(id); // to refresh list on catalog
        this.snackBar.open('Book deleted!', null, { duration: 2000 });
      });
  }

  onBookDetailNavigate(book: Book): void {
    this.router.navigate([book._id], { relativeTo: this.route });
  }

}
