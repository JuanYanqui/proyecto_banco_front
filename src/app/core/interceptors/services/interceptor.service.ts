import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AlertsService } from '../../alerts/services/alerts.service';
import { SpinnerService } from '../../services/spinner.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
 intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token'); // o donde hayas guardado tu JWT

    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
