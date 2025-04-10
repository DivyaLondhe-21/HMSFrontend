import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../../models/reservation.models';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = 'http://localhost:5032/reservations'; // Update with your ReservationService URL

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  // Get all reservations
  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}`);
  }

  // Get reservation by ID
  getReservationById(reservationId: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.baseUrl}/${reservationId}`);
  }

  // Get active reservations
  getActiveReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/active`);
  }

  // Create a new reservation
  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.baseUrl}/create`, reservation, this.httpOptions);
  }

  // Update reservation
  updateReservation(reservationId: number, reservation: Reservation): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/update/${reservationId}`, reservation, this.httpOptions);
  }

  // Delete reservation
  deleteReservation(reservationId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove/${reservationId}`);
  }

  getRateByRoom(roomId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/rate/${roomId}`);
  }
  
}
