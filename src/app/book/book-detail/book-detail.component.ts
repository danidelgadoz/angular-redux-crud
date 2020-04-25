import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { BookService } from '../book.service';
import { Book } from '../book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit, OnDestroy {
  bookForm: FormGroup;
  bookOnCreate$: Subscription;
  bookOnFindById$: Subscription;
  isEditFlowActive = false;
  currentBookIdOnEdit: string;

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.bookForm = this.initFormBuilder();

    const idFromUrlParam: string = this.activatedRoute.snapshot.params.id;

    if (idFromUrlParam) {
      this.isEditFlowActive = true;
      this.currentBookIdOnEdit = idFromUrlParam;
      this.requestFindBookById(idFromUrlParam);
    } else {
      this.bookForm.get('posterImgPath').setValue(this.getRamdomImage());
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.bookOnCreate$?.unsubscribe();
  }

  onNavigateToCatalog() {
    this.router.navigate(['..']);
  }

  onFormSubmit() {
    if (this.isEditFlowActive) {
      console.log('onFormSubmit::UPDATE');
    } else {
      console.log('onFormSubmit::CREATE');
      this.requestCreate(this.bookForm.value);
    }
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

  private setFormBuilderValues(book: Book): void {
    const { author, description, favorite, posterImgPath, title } = book;
    this.bookForm.patchValue({ author, description, favorite, posterImgPath, title });
  }

  private requestFindBookById(id: string): void {
    this.bookOnFindById$ = this.bookService
      .findById(id)
      .subscribe((book) => {
        this.setFormBuilderValues(book);
      });
  }

  private requestCreate(book: Omit<Book, '_id'>) {
    this.bookOnCreate$ = this.bookService
      .create(book)
      .subscribe((newBook) => {
        this.snackBar.open('Book created!', null, { duration: 2000 });
      });
  }

  private getRamdomImage(): string {
    const randomIdFrom1To500 = Math.floor((Math.random() * 500) + 1);
    return `https://i.picsum.photos/id/${randomIdFrom1To500}/200/200.jpg`;
  }

}
