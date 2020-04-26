import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BooksRoutingModule } from './books-router.module';

import { BooksComponent } from './books.component';
import { BookCardComponent } from './book-card/book-card.component';

@NgModule({
  declarations: [
    BooksComponent,
    BookCardComponent,
    ...BooksRoutingModule.components
  ],
  imports: [
    BooksRoutingModule,
    SharedModule,
  ],
  exports: [BooksComponent]
})
export class BookModule { }
