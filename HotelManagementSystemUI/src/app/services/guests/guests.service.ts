import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuestService {
  private apiUrl = 'http://localhost:5032/guest'; // Base URL for guest APIs

  constructor(private http: HttpClient) {}

  // Get all guests
  getGuests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Get guest by ID (optional for future use)
  getGuestById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Add a new guest
  addGuest(guest: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, guest);
  }

  // Update guest details
  updateGuest(id: number, guest: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, guest);
  }

  // Delete a guest
  deleteGuest(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
