import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Book } from '../book';
import { loadBooks } from '../store/book.actions';
import { featureKey } from '../store/book.state';

@Component({
  selector: 'app-book-catalog',
  templateUrl: './book-catalog.component.html',
  styleUrls: ['./book-catalog.component.scss']
})
export class BookCatalogComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  private bookStore$: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<{ books }>
  ) {
    this.store.dispatch(loadBooks());
  }

  ngOnInit(): void {
    this.bookStore$ = this.store.pipe(select(featureKey))
      .subscribe((bookStore) => {
        this.books = [...bookStore.data];
      });
  }

  ngOnDestroy(): void {
    this.bookStore$?.unsubscribe();
  }

  onNavigateToCreateBookView(): void {
    this.router.navigate(['create'], { relativeTo: this.activatedRoute });
  }

  onRefreshListWhenDeleteIsSuccess(idBookDeleted: string): void {
    this.books = [...this.books].filter(book => (book._id !== idBookDeleted));
  }

}
