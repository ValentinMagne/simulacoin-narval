import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BuyDialogComponent } from "./buy-dialog/buy-dialog.component";
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../../common/modules/material.module';
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from '../../common/modules/shared.module';

@NgModule({
  declarations: [
    BuyDialogComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class HomeModule {
}
