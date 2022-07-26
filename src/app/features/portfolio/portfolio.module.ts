import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from "../../common/modules/material.module";
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PortfolioRoutingModule } from "./portfolio-routing.module";
import { SharedModule } from "../../common/modules/shared.module";

@NgModule({
  declarations: [
    PortfolioComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PortfolioRoutingModule,
    SharedModule
  ]
})
export class PortfolioModule {
}
