import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { Book } from '../book';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCardComponent implements OnInit {
  @Input() book: Book;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onBookDetailNavigate(book: any) {
    this.router.navigate(['book', 1]);
  }

}
