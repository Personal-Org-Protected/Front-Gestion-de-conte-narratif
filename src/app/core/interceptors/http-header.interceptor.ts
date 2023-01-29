import { Injectable, OnInit } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { firstValueFrom, Observable,lastValueFrom, timeout, take, Subject, tap, switchMap } from 'rxjs';
import { AuthServicesService } from '../auth/auth-services.service';
import { IdToken } from '@auth0/auth0-angular';
import { AppComponent } from 'src/app/app.component';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor{

  private token$!:string;
  private modifRequest$!: HttpRequest<unknown>;
  constructor(private auth:AuthServicesService) {}



    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      return this.auth.getToken().pipe(
         // side effect to set token property on auth service
        switchMap(token => { // use transformation operator that maps to an Observable<T>
          const newRequest = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return next.handle(newRequest);
        })
      ); 

  }

  private getTokenClaims(){
    const response=this.auth.getTokenClaims();
    firstValueFrom(response).then((res)=>{
      console.log(res);
    });
  }

}
