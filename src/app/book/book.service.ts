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

  findById(id: string): Observable<Book> {
    return this.http.get<Book>(`${environment.api}/books/${id}`)
      .pipe(
        map((data) => data),
        catchError((err, caught) => EMPTY)
      );
  }

  create(book: Omit<Book, '_id'>): Observable<Book> {
    return this.http.post<Book>(`${environment.api}/books`, book)
      .pipe(
        map((response: any) => response),
        catchError((err, caught) => EMPTY)
      );
  }

  update(id: string, book: Omit<Book, '_id'>): Observable<Book> {
    return this.http.put<Book>(`${environment.api}/books/${id}`, book)
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

  delete(id: string): Observable<any> {
    return this.http.delete(`${environment.api}/books/${id}`)
      .pipe(
        map((response) => response),
        catchError((err, caught) => EMPTY)
      );
  }
}
