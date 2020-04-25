import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { BookService } from '../book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit, OnDestroy {
  bookForm: FormGroup;
  bookOnCreate$: Subscription;

  constructor(
    private bookService: BookService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.bookForm = this.initFormBuilder();
    this.bookForm.get('posterImgPath').setValue(this.getRamdomImage());
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.bookOnCreate$?.unsubscribe();
  }

  onNavigateToCatalog() {
    this.router.navigate(['books']);
  }

  onFormSubmit() {
    this.bookOnCreate$ = this.bookService
      .create({...this.bookForm.value})
      .subscribe((newBook) => {
        this.snackBar.open('Book created!', null, { duration: 2000 });
      });
  }

  private initFormBuilder(): FormGroup {
    return new FormGroup({
      author: new FormControl({ value: '', disabled: false }, [Validators.required]),
      description: new FormControl({ value: '', disabled: false }, [Validators.required]),
      favorite: new FormControl({ value: false, disabled: false }, [Validators.required]),
      posterImgPath: new FormControl({ value: '', disabled: false }, [Validators.required]),
      title: new FormControl({ value: '', disabled: false }, [Validators.required]),
    });
  }

  private getRamdomImage(): string {
    const randomIdFrom1To500 = Math.floor((Math.random() * 500) + 1);
    return `https://i.picsum.photos/id/${randomIdFrom1To500}/200/200.jpg`;
  }

}
