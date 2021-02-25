import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthenticationResponse } from '@app/models/authentication-response.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  baseUrl = `/jewelry_store/v1/dashboard`;
  constructor(private http: HttpClient) { }

  calculate(quantityInUnits: Number, pricePerUnit: Number): Observable<Number> {
    return this.http.get<Number>(`${this.baseUrl}/calculate?quantityInUnits=${quantityInUnits}&pricePerUnit=${pricePerUnit}`);
  }

  getDiscountPercentage(): Observable<Number> {
    return this.http.get<Number>(`${this.baseUrl}/discount_percent`);
  }
}
