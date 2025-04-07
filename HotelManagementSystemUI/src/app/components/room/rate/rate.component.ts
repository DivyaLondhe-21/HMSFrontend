import { Component, OnInit, Input } from '@angular/core';
import { RateService } from '../../../services/rateService/rate.service';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Rate } from '../../../models/rate.models';
import { Room } from '../../../models/room.models';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class RateComponent implements OnInit {
  @Input('roomRates') rates: any[] = [];
  //selectedRate: any = null;
  rateForm: FormGroup;
  showModal: boolean = false;
  //rates: Rate[] = [];
  rooms: Room[] = [
    { roomID: 1, roomType: 'Single', checkInDate: '2025-04-01', checkOutDate: '2025-04-05', availability: true },
    { roomID: 2, roomType: 'Double', checkInDate: '2025-04-02', checkOutDate: '2025-04-06', availability: false },
    // Add more rooms here as needed
  ];
  selectedRate: Rate | null = null;

  constructor(private fb: FormBuilder, private rateService: RateService) {
    this.rateForm = this.fb.group({
      rateId: [0],
      firstNightPrice: [null, [Validators.required, Validators.min(1000)]],
      extensionPrice: [null, [Validators.required, Validators.min(800)]],
      numberOfChildren: [null, [Validators.required]],
      numberOfGuests: [null, [Validators.required, Validators.min(1), Validators.max(3)]],
      numberOfDays: [null, [Validators.required, Validators.min(1)]],
      roomId: [null, [Validators.required]],
    });
  }


  ngOnInit(): void {
    //this.GetRates();
    this.GetRatesByRoomId();
  }
  // GetRates(): void {
  //   this.rateService.GetRates().subscribe((data: Rate[]) => {
  //     this.rates = data;
  //   }, error => {
  //     console.error('Error fetching rates:', error);
  //   });
  // }
  
  GetRatesByRoomId(): void {
    this.rateService.GetRatesByRoomId().subscribe((data: any[]) => {
      this.rates = data;
    });
  }
  AddRate(): void {
    if (this.rateForm.valid) {
      const rateData = this.rateForm.value;
      this.rateService.AddRate(rateData).subscribe(() => {
        this.GetRatesByRoomId(); // Refresh the rates list after adding a new rate
        this.closeModal(); // Close the modal after saving
      });
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
  UpdateRate(rateId: number): void {
    if (this.rateForm.valid) {
      const rateData = this.rateForm.value;
      this.rateService.UpdateRate(rateId, rateData).subscribe(() => {
        this.GetRatesByRoomId(); // Refresh the rates list after updating
        this.closeModal(); // Close the modal after saving
      });
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }

  DeleteRate(rateId: number): void {
    if (confirm('Are you sure you want to delete this rate?')) {
      this.rateService.DeleteRate(rateId).subscribe(() => {
        this.GetRatesByRoomId();
      });
    }
  }

  selectRate(rate: any): void {
    this.selectedRate = rate;
  }
  editRate(rate: Rate): void {
    this.selectedRate = rate;
    this.rateForm.patchValue(rate); // Patch the selected rate into the form
    this.showModal = true;
  }
  openModal(rate?: Rate): void {
    this.showModal = true;
    if (rate) {
      this.selectedRate = rate;
      this.rateForm.patchValue(rate); // Pre-fill form with rate data for editing
    } else {
      this.selectedRate = null;
      this.rateForm.reset(); // Reset form for new rate
    }
  }
  
  
  // Function to close the modal
  closeModal(): void {
    this.showModal = false;
    this.selectedRate = null;
    this.rateForm.reset();
  }

  // Function to save the updated rate
  saveRate(): void {
    if (this.rateForm.valid) {
      const rateData = this.rateForm.value;
      if (this.selectedRate) {
        const index = this.rates.findIndex((rate) => rate.rateId === rateData.rateId);
        if (index !== -1) {
          this.rates[index] = rateData;  // Update the rate
        }
      } else {
        this.rates.push(rateData); // Add new rate
      }
      this.closeModal(); // Close modal after saving
    }
  }
}

