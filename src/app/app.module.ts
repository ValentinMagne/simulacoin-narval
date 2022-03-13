import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRootComponent } from './components/app-root/app-root.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppRootComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppRootComponent]
})
export class AppModule {
}
