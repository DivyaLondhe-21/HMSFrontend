import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment/payment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PaymentComponent implements OnInit {
  payments: any[] = [];
  loading = false;
  showForm = false;
  newPayment: any = {
    amount: 0,
    payTime: new Date(),
    creditCardNumber: '',
    creditCardType: '',
    cvv: '',
    cardHolderName: '',
    creditExpiryDate: '',
    reservationId: null,
  };

  selectedDate: string = '';
  selectedMonth: number | null = null;
  selectedYear: number | null = null;

  @Input() reservationId: number | null = null;
  @Output() close = new EventEmitter<void>();

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments() {
    this.loading = true;
    if (this.reservationId) {
      this.paymentService.getPayments().subscribe(
        (data) => {
          this.payments = data.filter((p: any) => p.reservationId === this.reservationId);
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching payments:', error);
          this.loading = false;
        }
      );
    }
  }

  generateBill(paymentId: number) {
    this.paymentService.generateBill(paymentId).subscribe(
      () => {
        Swal.fire('Success', 'Bill generated successfully!', 'success');
        this.loadPayments();
      },
      () => {
        Swal.fire('Error', 'Error generating bill. Please try again!', 'error');
      }
    );
  }

  createPayment() {
    if (this.reservationId) {
      this.newPayment.reservationId = this.reservationId;
      this.paymentService.createPayment(this.newPayment).subscribe(
        (res) => {
          Swal.fire('Success', 'Payment added!', 'success');
          this.newPayment = {
            amount: 0,
            payTime: new Date(),
            creditCardNumber: '',
            creditCardType: '',
            cvv: '',
            cardHolderName: '',
            creditExpiryDate: '',
            reservationId: this.reservationId,
          };
          this.showForm = false;
          this.loadPayments();
        },
        (err) => {
          console.error('Payment creation failed', err);
          Swal.fire('Error', 'Failed to add payment.', 'error');
        }
      );
    }
  }

  filterByDate() {
    if (this.selectedDate) {
      this.paymentService.getPaymentsByDate(this.selectedDate).subscribe(
        (data) => {
          this.payments = data.filter((p: any) => p.reservationId === this.reservationId);
        },
        (err) => console.error(err)
      );
    }
  }

  filterByMonthYear() {
    if (this.selectedMonth && this.selectedYear) {
      this.paymentService.getPaymentsByMonthYear(this.selectedMonth, this.selectedYear).subscribe(
        (data) => {
          this.payments = data.filter((p: any) => p.reservationId === this.reservationId);
        },
        (err) => console.error(err)
      );
    }
  }
}
