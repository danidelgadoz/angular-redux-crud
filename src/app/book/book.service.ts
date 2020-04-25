import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Array<Book>> {
    return this.http.get<Array<Book>>(`${environment.api}/books`);
  }

  findById(id: string): Observable<Book> {
    return this.http.get<Book>(`${environment.api}/books/${id}`);
  }

  create(book: Omit<Book, '_id'>): Observable<Book> {
    return this.http.post<Book>(`${environment.api}/books`, book);
  }

  update(id: string, book: Omit<Book, '_id'>): Observable<Book> {
    return this.http.put<Book>(`${environment.api}/books/${id}`, book);
  }

  partialUpdate(id: string, book: Partial<Book>): Observable<Book> {
    return this.http.patch<Book>(`${environment.api}/books/${id}`, book);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${environment.api}/books/${id}`);
  }
}
