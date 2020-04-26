import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { BookService } from '../book.service';
import { Book } from '../book';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit, OnDestroy {
  bookForm: FormGroup;
  isEditFlowActive = false;
  private bookCreateApi$: Subscription;
  private bookFindByIdApi$: Subscription;
  private bookUpdateApi$: Subscription;
  private currentBookIdOnEdit: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookService: BookService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.bookForm = this.initFormBuilder();
    this.prepareCreateOrUpdateFlow();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.bookFindByIdApi$?.unsubscribe();
    this.bookUpdateApi$?.unsubscribe();
    this.bookCreateApi$?.unsubscribe();
  }

  onNavigateToCatalog(): void {
    this.router.navigate(['..']);
  }

  onFormSubmit(): void {
    if (this.isEditFlowActive) {
      this.requestUpdateAPI(this.currentBookIdOnEdit, this.bookForm.value);
    } else {
      this.requestCreateAPI(this.bookForm.value);
    }
  }

  private prepareCreateOrUpdateFlow() {
    const idFromUrlParam: string = this.activatedRoute.snapshot.params.id;
    if (idFromUrlParam) {
      this.isEditFlowActive = true;
      this.currentBookIdOnEdit = idFromUrlParam;
      this.requestFindByIdAPI(idFromUrlParam);
    } else {
      this.bookForm.get('posterImgPath').setValue(this.bookService.getRamdomPosterImgPath());
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

  private requestFindByIdAPI(id: string): void {
    this.bookFindByIdApi$ = this.bookService
      .findById(id)
      .subscribe((bookFinded) => {
        const { author, description, favorite, posterImgPath, title } = bookFinded;
        this.bookForm.patchValue({ author, description, favorite, posterImgPath, title });
      });
  }

  private requestCreateAPI(book: Omit<Book, '_id'>): void {
    this.bookCreateApi$ = this.bookService
      .create(book)
      .subscribe((newBook) => {
        this.snackBar.open('Book created!', 'OK', { duration: 2000 });
        this.bookForm.reset();
        Object.keys(this.bookForm.controls).forEach(key => {
          this.bookForm.get(key).setErrors(null);
        });
      });
  }

  private requestUpdateAPI(id: string, book: Omit<Book, '_id'>): void {
    this.bookUpdateApi$ = this.bookService
      .update(id, book)
      .subscribe((updatedBook) => {
        this.snackBar.open('Book updated!', 'OK', { duration: 2000 });
      });
  }

}
