import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Book } from '../book';
import { BookService } from '../book.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit, OnDestroy {
  @Input() book: Book;
  private partialUpdate$: Subscription;

  constructor(
    private bookService: BookService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.partialUpdate$?.unsubscribe();
  }

  onUpdateFavoriteState(): void {
    const updatedBook = { ...this.book, favorite: !this.book.favorite };

    this.partialUpdate$ = this.bookService
      .partialUpdate(this.book._id, updatedBook)
      .subscribe(({ favorite }) => {
        this.book = {...this.book, favorite };
      });
  }

  onBookDetailNavigate(book: any): void {
    this.router.navigate(['book', 1]);
  }

}
