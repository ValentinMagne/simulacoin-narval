import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../../modules/material.module';
import { MenuComponent } from './menu/menu.component';
import { SharedModule } from '../../modules/shared.module';

@NgModule({
  declarations: [
    MenuComponent
  ],
  exports: [
    MenuComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ]
})
export class MenuModule {
}
