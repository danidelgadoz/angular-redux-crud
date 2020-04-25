import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BookComponent } from './book.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookCatalogComponent } from './book-catalog/book-catalog.component';
import { BookCardComponent } from './book-card/book-card.component';
import { BookRoutingModule } from './book-router.module';

@NgModule({
  declarations: [
    BookComponent,
    BookDetailComponent,
    BookCatalogComponent,
    BookCardComponent
  ],
  imports: [
    SharedModule,
    BookRoutingModule
  ],
  exports: [BookComponent]
})
export class BookModule { }
