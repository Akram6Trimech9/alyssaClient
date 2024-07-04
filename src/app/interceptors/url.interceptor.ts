import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
   ApiUrl: string ='http://localhost:3000/api'
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
     const modifiedRequest = request.clone({
      url : this.ApiUrl+request.url
    });
    return next.handle(modifiedRequest).pipe(
      map((event: HttpEvent<any>) => {
         if (event instanceof HttpResponse) {
          console.log('Interceptor - Response received:', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
         console.error('Interceptor - Error:', error);
        return throwError(error);
      })
    );
  }
}
export const URL_PROVIDER ={
    provide :  HTTP_INTERCEPTORS ,
    useClass : UrlInterceptor , 
     multi : true
    }