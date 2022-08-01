import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimalsRoutingModule } from './features/animals/animals-routing.module';
import { ErrorRoutingModule } from './features/error/error-routing.module';
import { HomeRoutingModule } from './features/home/home-routing.module';
import { LoginRoutingModule } from './features/login/login-routing.module';

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
        loadChildren: () => LoginRoutingModule,
      },
      {
        path: 'portfolio',
        loadChildren: () => import('./features/portfolio/portfolio.module').then(m => m.PortfolioModule)
      },
      {
        path: 'animals',
        loadChildren: () => AnimalsRoutingModule,
      },
      {
        path: 'error',
        loadChildren: () => ErrorRoutingModule,
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
