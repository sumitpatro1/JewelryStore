import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import * as jwt_decode from "jwt-decode";
import { AuthenticationResponse, AuthenticationToken } from '@app/models/authentication-response.model';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Injectable()
export class AuthService {
    authState = new BehaviorSubject(false);

    constructor(private router: Router
        , private loadingCtrl: LoadingBarService) {
        console.log('ctor auth');
        this.checkToken();
    }
    private KEY_TOKEN = 'token';

    initializeSession(session: AuthenticationResponse) {
        console.log('INITIALIZING SESSION');
        let str = JSON.stringify(session);
        localStorage.setItem(this.KEY_TOKEN, str);
        this.checkToken();
    }

    getRemainingSeconds() {
        let session = this.getSession();
        if (session) {
            let seconds = moment(session.token.expires * 1000).unix() - moment().unix();
            //console.log(`SESSION ENDS IN ${seconds}`);
            return seconds;
        }
        return 0;
    }

    checkToken() {
        let isLoggedIn = this.isLoggedIn;
        if(isLoggedIn) {
            this.router.navigateByUrl('/dashboard');
        } else{
            this.router.navigateByUrl('/login');
        }
        console.log("TOKEN CHECKED ", isLoggedIn);
        this.authState.next(isLoggedIn);
    }

    private getSession(): AuthenticationResponse {
        let str = localStorage.getItem(this.KEY_TOKEN);
        if (!str)
            return null;
        let obj = JSON.parse(str);
        let decoded = jwt_decode(obj.token.token);

        let auth: AuthenticationResponse = new AuthenticationResponse();
        auth.user_name = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
        auth.user_role = decoded.role;
        auth.token = new AuthenticationToken();
        auth.token.expires = decoded.exp;
        auth.token.token = obj.token.token;

        return auth;
    }

    get isLoggedIn() {
        return this.getRemainingSeconds() > 0;
    }

    get isLoggedOut() {
        return !this.isLoggedIn;
    }

    get token(): string {
        let session = this.getSession();
        return session && session.token ? session.token.token : '';
    }

    get username() {
        let session = this.getSession();
        if (session) {
            return session.user_name
        }
        return '';
    }

    get isPriviledged(): boolean {
        let session = this.getSession();
        if (session && session.user_role) {
            return session.user_role.toLowerCase().indexOf('priviledged') > -1;
        }
    }

    destroySession() {
        localStorage.removeItem(this.KEY_TOKEN);
    }

    async logout() {
        await this.loadingCtrl.start();
        this.destroySession();
        this.checkToken();
        await this.loadingCtrl.stop();
        this.authState.next(false);
    }
}