import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TokenStorageService } from './tokenstorage.service';
import { NbAuthJWTInterceptor } from '@nebular/auth';
import { map, catchError } from 'rxjs/operators';
import { Logger } from '../log.service';
import { Router } from '@angular/router';
import { ToastrService } from '../pages/sharedmodule/toast';
const TOKEN_HEADER_KEY = 'Authorization';
const CONTENTTYPE = 'Content-Type';
const ACCEPT = 'Accept';
const APPJSON = 'application/json';
@Injectable({ providedIn: 'root' })
export class JwtInterceptorService implements HttpInterceptor {

  constructor(
    private token: TokenStorageService, 
    private log: Logger,
    private router:Router,
    private toast:ToastrService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.token.getToken();
    if (!req.headers.has(CONTENTTYPE)) {
      req = req.clone({ setHeaders: { 'Content-Type': 'application/json' } })
    }
    if (!req.headers.has(ACCEPT)) {
      req = req.clone({ setHeaders: { 'Accept': 'application/json' } })
    }
    if (token !== null) {
      req = req.clone({ setHeaders: { 'Authorization': 'Bearer ' + token } })
    }
    return next.handle(req).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 400:
              console.log(400);
              return Observable.throw(error);
            case 401:
              console.log(401);
              this.token.clear();
              this.router.navigate(['auth/login']);
              return Observable.throw(error);
            case 403:
              console.log(403);
              this.toast.notify(4,"Quyền","Bạn không có quyền truy cập.");
              return Observable.throw(error);
            case 500:
              this.toast.notify(4,"Lỗi",error.error.message);
          }
        }else{

        }
      })
    );
  }
  /**
   * manage errors
   * @param err
   * @returns {any}
   */
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401) {
        //navigate /delete cookies or whatever
        console.log('handled error ' + err.status);
        this.router.navigate(['auth/login']);
        // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
        return of(err.message);
    }
    throw err;
}



}
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true }
];
