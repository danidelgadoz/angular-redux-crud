import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BookService } from '../book.service';
import { Book } from '../book';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-catalog',
  templateUrl: './book-catalog.component.html',
  styleUrls: ['./book-catalog.component.scss']
})
export class BookCatalogComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  private bookSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {
    this.requestForBooks();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.bookSubscription?.unsubscribe();
  }

  onNavigateToAddBook(): void {
    this.router.navigate(['create'], { relativeTo: this.activatedRoute });
  }

  private requestForBooks(): void {
    this.bookSubscription = this.bookService
      .findAll()
      .subscribe(books => {
        this.books = books;
      });
  }

}
