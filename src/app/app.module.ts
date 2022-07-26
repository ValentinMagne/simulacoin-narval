import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CurrencyPipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRootComponent } from './components/app-root/app-root.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BuyDialogComponent } from './features/home/buy-dialog/buy-dialog.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './features/home/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from "./modules/material.module";
import { MenuComponent } from './components/menu/menu.component';
import { SharedModule } from "./modules/shared.module";

@NgModule({
  declarations: [
    AppRootComponent,
    BuyDialogComponent,
    ErrorComponent,
    HomeComponent,
    LoginComponent,
    MenuComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    CurrencyPipe,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppRootComponent]
})
export class AppModule {
}
