import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-books',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class BooksComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
