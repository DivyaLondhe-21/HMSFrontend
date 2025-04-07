import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment/payment.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  imports: [CommonModule]
})
export class PaymentComponent implements OnInit {
  payments: any[] = [];
  loading = false;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  // Load all payments
  loadPayments() {
    this.loading = true;
    this.paymentService.getPayments().subscribe(
      (data) => {
        this.payments = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching payments:', error);
        this.loading = false;
      }
    );
  }

  // Generate bill for a payment
  generateBill(paymentId: number) {
    this.paymentService.generateBill(paymentId).subscribe(
      (response) => {
        Swal.fire('Success', 'Bill generated successfully!', 'success');
        this.loadPayments(); // Reload payments after generating bill
      },
      (error) => {
        Swal.fire('Error', 'Error generating bill. Please try again!', 'error');
      }
    );
  }
}
