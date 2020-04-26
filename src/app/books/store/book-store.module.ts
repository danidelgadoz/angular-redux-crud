import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BookEffects } from './book.effects';
import { reducer } from './book.reducer';
import { featureKey } from './book.state';

@NgModule({
  imports: [
    StoreModule.forFeature(featureKey, reducer),
    EffectsModule.forFeature([BookEffects])
  ]
})
export class BookStoreModule { }
