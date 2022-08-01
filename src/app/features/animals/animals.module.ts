import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AnimalsComponent } from './animals/animals.component';
import { MaterialModule } from '../../common/modules/material.module';

@NgModule({
  declarations: [
    AnimalsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class AnimalsModule {
}
