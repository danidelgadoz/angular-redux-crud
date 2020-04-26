import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { BookService } from '../book.service';
import { Book } from '../book';
import * as bookActions from '../store/book.actions';
import * as bookSelector from '../store/book.selectors';
import { getBookSelected } from '../store/book.selectors';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit, OnDestroy {
  bookForm: FormGroup;
  isEditFlowActive = false;
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
    this.bookStore$.add(
      this.store.select(bookSelector.isUpdateSuccess)
        .pipe(filter(done => done))
        .subscribe(() => this.snackBar.open('Book updated!', 'OK', { duration: 2000 })),
    );
  }

  ngOnDestroy(): void {
    this.bookStore$?.unsubscribe();
  }

  onNavigateToCatalog(): void {
    this.router.navigate(['..']);
  }

  onFormSubmit(): void {
    if (this.isEditFlowActive) {
      this.store.dispatch(bookActions.updateBook({ payload: { ...this.bookForm.value, _id: this.currentBookIdOnEdit} }));
    } else {
      this.store.dispatch(bookActions.createBook({ payload: this.bookForm.value }));
    }
  }

  private prepareCreateOrUpdateFlow() {
    const idFromUrlParam: string = this.activatedRoute.snapshot.params.id;
    if (idFromUrlParam) {
      this.isEditFlowActive = true;
      this.currentBookIdOnEdit = idFromUrlParam;
      this.store.dispatch(bookActions.loadBookById({ payload: idFromUrlParam }));
      this.handleBookSelectedChanges(idFromUrlParam);
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

  private handleBookSelectedChanges(id: string): void {
    this.bookStore$.add(
      this.store.pipe(select(getBookSelected, { id }))
        .pipe(filter(book => !!book))
        .subscribe(bookFinded => {
          const { author, description, favorite, posterImgPath, title } = bookFinded;
          this.bookForm.patchValue({ author, description, favorite, posterImgPath, title });
        })
    );
  }

  private onCreateSuccess(): void {
    this.snackBar.open('Book created!', 'OK', { duration: 2000 });
    this.bookForm.reset();
    Object.keys(this.bookForm.controls).forEach(key => {
      this.bookForm.get(key).setErrors(null);
    });
  }

}
