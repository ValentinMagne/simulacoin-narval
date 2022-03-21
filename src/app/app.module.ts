import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CurrencyPipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRootComponent } from './components/app-root/app-root.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from "./modules/material.module";
import { MenuComponent } from './components/menu/menu.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ProfitAndLossDirective } from './directives/profit-and-loss.directive';
import { BuyDialogComponent } from './components/buy-dialog/buy-dialog.component';

@NgModule({
  declarations: [
    AppRootComponent,
    ErrorComponent,
    HomeComponent,
    LoginComponent,
    MenuComponent,
    PortfolioComponent,
    ProfitAndLossDirective,
    BuyDialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    CurrencyPipe,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppRootComponent]
})
export class AppModule {
}
