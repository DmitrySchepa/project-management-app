import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(
      request.clone({
        url: `${environment.BASE_URL}/${request.url}`,
        headers: request.headers.set(
          'Authorization',
          `Bearer ${localStorage.getItem('pwa-token')}`,
        ),
      }),
    );
  }
}
