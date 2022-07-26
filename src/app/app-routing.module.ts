import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from './components/error/error.component';
import { HomeRoutingModule } from "./features/home/home-routing.module";
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        loadChildren: () => HomeRoutingModule,
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'portfolio',
        loadChildren: () => import('./features/portfolio/portfolio.module').then(m => m.PortfolioModule)
      },
      {
        path: 'error',
        component: ErrorComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
