import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authData: any = JSON.parse(localStorage.getItem(environment.apiTokenKey));
        if (authData) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${authData.token}`
                }
            });
        }
        return next.handle(req).pipe(catchError(err => {
            const error = err.error.message || err.status;
            return throwError(error);
        }));
    }
}
