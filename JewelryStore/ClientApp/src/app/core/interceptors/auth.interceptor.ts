import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError,  } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '@app/services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService, private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.auth.token;

        if (token) {
            req = req.clone({ headers: req.headers.set("Authorization", "Bearer " + token) });
        }

        return next.handle(req).pipe(
            catchError(err => this.handleError(err)),
            map((event: HttpEvent<any>) =>    this.log(event, req)));
    }

    private log(event, req) {
        if (event instanceof HttpResponse) {
            let apiTime = <any>event.headers.get('X-TIME-TAKEN-MILLISECONDS') || 0;
            console.log(`%c[${apiTime / 1000}s] [${event.status} - ${req.url}]`, 'background: #222; color: #bada55');
        }

        return event;
    }

    private handleError(error) {
        let errorMessage = '';
        if (error instanceof HttpErrorResponse) {
            if(error.status == 401) {
                localStorage.removeItem('token');
                this.auth.checkToken();
            }
            errorMessage = `%c[${error.status}] [${error.error? error.error.message : ''} - ${error.url}]`;
            console.log(errorMessage, 'background: red; color: #fff');
        } else {
            errorMessage = `Error: ${error.message}`;
        }
        return throwError(error);
    }
}