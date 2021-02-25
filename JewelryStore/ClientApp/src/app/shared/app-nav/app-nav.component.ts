import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss'],
})
export class AppNavComponent implements OnInit {
  constructor(
    public auth: AuthService,
  ) {}

  isAuthenticated: boolean = false;
  async ngOnInit() {
    this.isAuthenticated = this.auth.isLoggedIn;
  }

  get user() {
    return this.auth.username;
  }

  get username() {
    if (this.user) {
      return this.user || '';
    }
    return '';
  }


  async logout() {
    this.auth.logout();
  }
}
