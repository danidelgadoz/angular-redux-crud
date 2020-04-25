import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookCatalogComponent } from './book-catalog/book-catalog.component';

export const BookRoutes: Routes = [
  {
    path: '',
    redirectTo: 'book',
    pathMatch: 'full'
  },
  {
    path: 'book',
    children: [
      {
        path: '',
        component: BookCatalogComponent
      },
      {
        path: 'create',
        component: BookDetailComponent
      },
      {
        path: ':id',
        component: BookDetailComponent
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(BookRoutes, { useHash: true })],
  exports: [RouterModule]
})

export class BookRoutingModule { }
