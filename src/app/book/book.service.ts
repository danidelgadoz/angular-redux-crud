import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Book } from './book';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Array<Book>> {
    return this.http.get<Array<Book>>(`${environment.api}/books`)
      .pipe(
        map((response: any) => response),
        catchError((err, caught) => EMPTY)
      );
  }

  partialUpdate(id: string, book: Partial<Book>): Observable<Book> {
    return this.http.patch<Book>(`${environment.api}/books/${id}`, book)
      .pipe(
        map((response: any) => response),
        catchError((err, caught) => EMPTY)
      );
  }
}
