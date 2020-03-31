import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './jwt.interceptor.service';

@NgModule({
    imports: [
      CommonModule,
      HttpClientModule
    ],
    declarations: [],
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptorService,
        multi: true,
      },JwtInterceptorService
    ]
  })
export class MyCoreModule{}