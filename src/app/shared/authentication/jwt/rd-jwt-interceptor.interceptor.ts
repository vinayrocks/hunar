import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RdAuthenticateService } from '../../services/authentication/rd-authenticate.service';

@Injectable()
export class RdJwtInterceptorInterceptor implements HttpInterceptor {

  constructor(private rdAuthenticateService: RdAuthenticateService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // add authorization header with jwt token if available
      let currentUser = this.rdAuthenticateService.currentUserValue;
      if (currentUser && currentUser.token) {
          request = request.clone({
              setHeaders: { 
                  Authorization: `Bearer ${currentUser.token}`
              }
          });
      }

      return next.handle(request);
  }
}
