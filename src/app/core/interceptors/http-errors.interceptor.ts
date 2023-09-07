import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {

  constructor(private router:Router) {}

  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(
      
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          console.log('this is client side error');
          errorMsg = `Error: ${error.error.message}`;
        }
        else {
          console.log('this is server side error');
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
      
        this.redirectPage(error);
        return throwError(errorMsg);
      }));
  }


  private redirectPage(errors:HttpErrorResponse){
    switch (errors.status) {
      case 404:
         this.router.navigate(['Error/not-Found']);
        break;

      case 401 && 403:
          this.router.navigate(['Error/forbidden']);
         break;

      case 400 && 405 && 406:
          this.router.navigate(['Error/forbidden-operations']);
         break;
    
      case 0 && 500 && 501 && 503:
           this.router.navigate(['Error/server']);
         break;
    
      default:
        this.router.navigate(['Public/project']);
        break;
    }
  }

}
