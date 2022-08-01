import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimalsComponent } from './animals/animals.component';


const routes: Routes = [
  {
    path: '',
    component: AnimalsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AnimalsRoutingModule {
}