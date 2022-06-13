import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProfitAndLossDirective } from "../directives/profit-and-loss.directive";

@NgModule({
  declarations: [
    ProfitAndLossDirective
  ],
  exports: [
    ProfitAndLossDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
