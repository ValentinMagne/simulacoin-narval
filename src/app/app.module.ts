import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CurrencyPipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRootComponent } from './components/app-root/app-root.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorModule } from "./features/error/error.module";
import { HomeModule } from "./features/home/home.module";
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from "./modules/material.module";
import { MenuModule } from "./features/menu/menu.module";
import { SharedModule } from "./modules/shared.module";

@NgModule({
  declarations: [
    AppRootComponent,
    LoginComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ErrorModule,
    FormsModule,
    HomeModule,
    HttpClientModule,
    MaterialModule,
    MenuModule,
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
