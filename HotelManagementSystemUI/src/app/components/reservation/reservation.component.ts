import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../services/reservationService/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ReservationComponent implements OnInit {
  reservationForm!: FormGroup;
  reservations: any[] = [];
  isEditMode = false;
  selectedReservationId: number | null = null;

  constructor(private fb: FormBuilder, private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllReservations();
    this.setupPriceCalculation();
  }

  initForm(): void {
    this.reservationForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+91\s[7-9]\d{9}$/)]],
      company: ['', [Validators.required, Validators.maxLength(100)]],
      gender: ['', [Validators.required]],
      address: ['', [Validators.maxLength(200)]],
      roomId: [null, Validators.required],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      numberOfAdults: [1, [Validators.required, Validators.min(1)]],
      numberOfChildren: [0, Validators.min(0)],
      price: [0, Validators.required],
    });
  }

  getAllReservations(): void {
    this.reservationService.getReservations().subscribe(
      (data) => (this.reservations = data),
      () => alert('Error fetching reservations')
    );
  }

  onSubmit(): void {
    if (this.reservationForm.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }

    this.isEditMode ? this.updateReservation() : this.createReservation();
  }

  createReservation(): void {
    this.reservationService.createReservation(this.reservationForm.value).subscribe(
      () => {
        alert('Reservation created successfully');
        this.resetForm();
        this.getAllReservations();
      },
      () => alert('Error creating reservation')
    );
  }

  onEdit(reservation: any): void {
    this.isEditMode = true;
    this.selectedReservationId = reservation.reservationId;
    this.reservationForm.patchValue(reservation);
  }

  updateReservation(): void {
    if (!this.selectedReservationId) return;

    this.reservationService.updateReservation(this.selectedReservationId, this.reservationForm.value).subscribe(
      () => {
        alert('Reservation updated successfully');
        this.resetForm();
        this.getAllReservations();
      },
      () => alert('Error updating reservation')
    );
  }

  onDelete(reservationId: number): void {
    if (confirm('Are you sure you want to delete this reservation?')) {
      this.reservationService.deleteReservation(reservationId).subscribe(
        () => {
          alert('Reservation deleted successfully');
          this.getAllReservations();
        },
        () => alert('Error deleting reservation')
      );
    }
  }

  resetForm(): void {
    this.reservationForm.reset();
    this.isEditMode = false;
    this.selectedReservationId = null;
  }

  setupPriceCalculation(): void {
    ['roomId', 'numberOfChildren', 'numberOfAdults', 'checkInDate', 'checkOutDate'].forEach((field) => {
      this.reservationForm.get(field)?.valueChanges.subscribe(() => this.calculatePrice());
    });
  }

  calculatePrice(): void {
    const { roomId, numberOfChildren, numberOfAdults } = this.reservationForm.value;
    if (!roomId) return;

    this.reservationService.getRateByRoom(roomId).subscribe(
      (rate) => {
        if (rate) {
          const nights = this.calculateNumOfNights();
          const baseRate = rate.baseRatePerNight;
          const childCharge = rate.additionalChargesPerChild * (numberOfChildren || 0);
          const adultCharge = rate.additionalChargesPerAdult * ((numberOfAdults || 1) - 1);
          const totalPrice = (baseRate + childCharge + adultCharge) * nights;

          this.reservationForm.patchValue({ price: totalPrice });
        }
      },
      () => console.error('Error fetching rate')
    );
  }

  calculateNumOfNights(): number {
    const checkIn = new Date(this.reservationForm.value.checkInDate);
    const checkOut = new Date(this.reservationForm.value.checkOutDate);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    return Math.max(Math.ceil(timeDiff / (1000 * 3600 * 24)), 1);
  }
}
