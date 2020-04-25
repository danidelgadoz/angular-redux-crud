import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BookRoutingModule } from './book-router.module';
import { BookComponent } from './book.component';
import { BookCardComponent } from './book-card/book-card.component';
import { BookCatalogComponent } from './book-catalog/book-catalog.component';
import { BookDetailComponent } from './book-detail/book-detail.component';

@NgModule({
  declarations: [
    BookComponent,
    BookCardComponent,
    BookCatalogComponent,
    BookDetailComponent,
  ],
  imports: [
    BookRoutingModule,
    SharedModule,
  ],
  exports: [BookComponent]
})
export class BookModule { }
