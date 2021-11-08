import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Book } from '../book';
import * as bookActions from '../store/book.actions';
import * as bookSelector from '../store/book.selectors';

@Component({
  selector: 'app-book-catalog',
  templateUrl: './book-catalog.component.html',
  styleUrls: ['./book-catalog.component.scss']
})
export class BookCatalogComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  private bookStore$!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<{ books: any }>
  ) {
    this.store.dispatch(bookActions.findAllBooks());
  }

  ngOnInit(): void {
    this.bookStore$ = this.store.select(bookSelector.selectAllBooks)
      .subscribe((books) => {
        this.books = [...books];
      });
  }

  ngOnDestroy(): void {
    this.bookStore$?.unsubscribe();
  }

  onNavigateToCreateBookView(): void {
    this.router.navigate(['create'], { relativeTo: this.activatedRoute });
  }

}
