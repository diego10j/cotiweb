import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Injectable,  } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {     
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.authService.getToken()).pipe(mergeMap((token) => {
      const changedReq = request.clone({
          setHeaders: {
              'cotiweb-token': `${token}`
          }
      });
      return next.handle(changedReq);
  }));
 
}

}
