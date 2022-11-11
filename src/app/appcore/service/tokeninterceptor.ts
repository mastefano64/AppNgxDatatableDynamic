import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

// https://stackoverflow.com/questions/49855216/angular-interceptor-not-loading-in-a-lazy-loaded-module

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private sessionkey = 'AppCollaborationClient:AuthStatus';

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const s = req.url.toLowerCase();
    if (s.indexOf('/login') !== -1) {
      return next.handle(req.clone());
    }
    const jsonReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + 'token-qwe',
      }
    });
    return next.handle(jsonReq as any);
  }

}
