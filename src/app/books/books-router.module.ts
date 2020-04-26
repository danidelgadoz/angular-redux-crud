import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookFormComponent } from './book-form/book-form.component';
import { BookCatalogComponent } from './book-catalog/book-catalog.component';

export const BookRoutes: Routes = [
  {
    path: 'book',
    children: [
      {
        path: '',
        component: BookCatalogComponent
      },
      {
        path: 'create',
        component: BookFormComponent
      },
      {
        path: ':id',
        component: BookFormComponent
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(BookRoutes)],
  exports: [RouterModule]
})

export class BooksRoutingModule {
  static components = [ BookFormComponent, BookCatalogComponent];
}
