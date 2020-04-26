import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { BookService } from '../book.service';
import { Book } from '../book';
import * as bookActions from '../store/book.actions';
import * as bookSelector from '../store/book.selectors';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit, OnDestroy {
  bookForm: FormGroup;
  isEditFlowActive = false;
  private bookUpdateApi$: Subscription;
  private bookFindByIdApi$: Subscription;
  private currentBookIdOnEdit: string;
  private bookStore$: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookService: BookService,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store<{ books }>
  ) {
    this.bookStore$ = new Subscription();
    this.bookForm = this.initFormBuilder();
    this.prepareCreateOrUpdateFlow();
  }

  ngOnInit(): void {
    this.bookStore$.add(
      this.store.select(bookSelector.isCreatedSuccess)
        .pipe(filter(done => done))
        .subscribe(() => this.onCreateSuccess())
    );
  }

  ngOnDestroy(): void {
    this.bookFindByIdApi$?.unsubscribe();
    this.bookStore$?.unsubscribe();
    this.bookUpdateApi$?.unsubscribe();
  }

  onNavigateToCatalog(): void {
    this.router.navigate(['..']);
  }

  onFormSubmit(): void {
    if (this.isEditFlowActive) {
      this.requestUpdateAPI(this.currentBookIdOnEdit, this.bookForm.value);
    } else {
      this.store.dispatch(bookActions.createBook({ payload: this.bookForm.value }));
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

  private onCreateSuccess(): void {
    this.snackBar.open('Book created!', 'OK', { duration: 2000 });
    this.bookForm.reset();
    Object.keys(this.bookForm.controls).forEach(key => {
      this.bookForm.get(key).setErrors(null);
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
