import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rate } from '../../models/rate.models'; // adjust the path if needed

@Injectable({
  providedIn: 'root'
})
export class RateService {
  private apiUrl = 'http://localhost:5032/rate';

  constructor(private http: HttpClient) {}

  GetRatesByRoomId(roomId: number): Observable<Rate[]> {
    return this.http.get<Rate[]>(`${this.apiUrl}/room/${roomId}`);
  }

  AddRate(rate: Rate): Observable<any> {
    return this.http.post(`${this.apiUrl}`, rate);
  }

  UpdateRate(rate: Rate): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}`, rate);
  }

  DeleteRate(rateId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${rateId}`);
  }
}
