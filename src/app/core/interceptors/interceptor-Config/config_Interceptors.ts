import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpErrorsInterceptor } from "../http-errors.interceptor";
import { HttpHeaderInterceptor } from "../http-header.interceptor";
import { HttpParameterInterceptor } from "../http-parameter.interceptor";


export const interceptorProviders = 
   [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorsInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpParameterInterceptor, multi: true },

];