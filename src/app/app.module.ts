import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from './core/auth.service';
import { AuthGuardService } from './core/auth-guard.service';
import { DataService } from './core/data.service';
import { AuthInterceptor } from './core/AuthInterceptor.service';
import { MainMenu } from './menu/main.menu';
import { AppMenu } from './menu/app.menu';
import { AppRoot } from './app.root';
import { AppLogin } from './home/login';
import { routing } from './app.routes';
//import {ListComponent} from './jinghuo/list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

@NgModule({
  declarations:
    [MainMenu, AppLogin, AppMenu, AppRoot],
  imports:
    [BrowserModule, BrowserAnimationsModule, ReactiveFormsModule, FormsModule, HttpClientModule, routing, NgbModule],
  providers: [
    { provide: 'auth', useClass: AuthService }, AuthGuardService, DataService,
    //{provide: 'user', useClass: UserService},
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppRoot]
})
export class AppModule { }
