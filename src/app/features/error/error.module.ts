import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorComponent } from './error/error.component';
import { ErrorRoutingModule } from './error-routing.module';
import { MaterialModule } from '../../modules/material.module';

@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    CommonModule,
    ErrorRoutingModule,
    MaterialModule
  ]
})
export class ErrorModule {

}
