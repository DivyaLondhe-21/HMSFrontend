import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RateService {
  private apiUrl = 'http://localhost:5032/rate';

  constructor(private http: HttpClient) {}
  GetRates(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5000/api/rate'); // replace with your real URL
  }
  
  GetRatesByRoomId(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/`);
  }

  // getRateById(rateId: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/${rateId}`);
  // }

  AddRate(rate: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add/`, rate);
  }

  UpdateRate(rateId: number, rate: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update/${rateId}`, rate);
  }

  DeleteRate(rateId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove/${rateId}`);
  }
}

