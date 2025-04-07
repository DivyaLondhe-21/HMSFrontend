import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://localhost:5032/payment'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  // Get all payments
  getPayments(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Get payment by ID
  getPaymentById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Generate bill for a payment
  generateBill(paymentId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${paymentId}/generate-bill`, {});
  }
}
