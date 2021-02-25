import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '@app/services';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(public auth: AuthService, public router: Router) {
        console.log('AuthGuard ctor');
    }

    canActivate() {
        console.log('AuthGuard.canActivate', this.auth.authState.value)
        return this.auth.authState.value;
    }

    canActivateChild() {
        console.log('AuthGuard.canActivateChild', this.auth.authState.value)
        return this.auth.authState.value;
    }
}