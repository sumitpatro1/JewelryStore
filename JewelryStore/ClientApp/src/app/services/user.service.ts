import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthenticationResponse } from '@app/models/authentication-response.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = `/jewelry_store/v1/user_credentials`;
  constructor(private http: HttpClient) { }

  authenticate(userCreds): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}`, userCreds);
  }
}
