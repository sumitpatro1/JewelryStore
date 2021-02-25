import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, catchError, concatMap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { AuthService } from '@app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '@app/services';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AuthenticationResponse } from '@app/models/authentication-response.model';

@Component({
  selector: 'app-emrsn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading$: any;
  submitted: Boolean = false;
  configuration: any = {};
  constructor(
    public auth: AuthService,
    private toast: ToastrService,
    public formBuilder: FormBuilder,
    private router: Router,
    private userSvc: UserService,
    private loadingSvc: LoadingBarService) {
    console.log("LoginComponent ctor");
  }

  ngOnInit() {
    console.log("LoginComponent", "init");
    this.loginForm = this.formBuilder.group({
      user_name: new FormControl('', [Validators.required, Validators.maxLength(60), Validators.email]),
      password: new FormControl('', [Validators.required, Validators.maxLength(60)])
    });

    if (this.auth.isLoggedIn) {
      console.log("isloggedin");
      this.dashboard();
    }
  }

  login(creds: any) {
    this.submitted = true;
    if (this.loginForm.valid) {
      const ob$ = this.userSvc.authenticate(creds)
        .pipe(
          catchError(error => {
            this.loadingSvc.stop();
            this.toast.error('Invalid Username or Password!');
            return throwError(error);
          }),
          concatMap((response: AuthenticationResponse) => {
            this.submitted = false;
            this.auth.initializeSession(response);
            return of();
          }),
          finalize(() => {
            this.loadingSvc.stop();
          }));

      this.loadingSvc.start();
      ob$.subscribe(result => { });
    }
  }

  dashboard() {
    this.router.navigate(['/', 'dashboard']);
  }
}

