import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AppRootComponent } from './common/components/app-root/app-root.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './common/interceptors/auth.interceptor';
import { AuthState } from './features/auth/auth-state';
import { ErrorModule } from './features/error/error.module';
import { HomeModule } from './features/home/home.module';
import { LoginModule } from './features/login/login.module';
import { MaterialModule } from './common/modules/material.module';
import { MenuModule } from './features/menu/menu.module';
import { SharedModule } from './common/modules/shared.module';
import { AnimalsState } from "./features/animals/animals/animals.state";

@NgModule({
  declarations: [
    AppRootComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ErrorModule,
    FormsModule,
    HomeModule,
    HttpClientModule,
    LoginModule,
    MaterialModule,
    MenuModule,
    NgxsModule.forRoot([AuthState, AnimalsState]),
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
