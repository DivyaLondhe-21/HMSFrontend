import { Component } from '@angular/core';
import { RateService } from '../../../services/rateService/rate.service';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Rate } from '../../../models/rate.models';
import { Room } from '../../../models/room.models';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  standalone: true
})
export class RateComponent {
  rateForm: FormGroup;
  showAddRateModal = false;
  showEditRateModal = false;
  selectedRoom: Room | null = null;
  roomIdInput: number | null = null;

  rates: Rate[] = [];
  selectedRateId: number | null = null;

  constructor(private fb: FormBuilder, private rateService: RateService) {
    this.rateForm = this.fb.group({
      rateId: [0],
      roomId: ['', Validators.required],
      firstNightPrice: ['', Validators.required],
      extensionPrice: ['', Validators.required],
      numberOfGuests: ['', Validators.required],
      numberOfChildren: ['', Validators.required],
      numberOfDays: ['', Validators.required]
    });
  }

  getRatesForRoom(roomId: number) {
    if (!this.selectedRoom) return;
    this.rateService.GetRatesByRoomId(roomId).subscribe(data => {
      this.rates = data;
    });
  }

  openAddRateModal() {
    this.rateForm.reset();
    this.rateForm.get('roomId')?.setValue(this.selectedRoom);
    this.showAddRateModal = true;
    this.showEditRateModal = false;
    this.rateForm.reset();
  }

  openEditRateModal(rate: Rate) {
    this.showEditRateModal = true;
    this.showAddRateModal = false;
    this.selectedRateId = rate.rateId;

    this.rateForm.patchValue({
      rateId: rate.rateId,
      firstNightPrice: rate.firstNightPrice,
      extensionPrice: rate.extensionPrice,
      numberOfGuests: rate.numberOfGuests,
      numberOfChildren: rate.numberOfChildren,
      numberOfDays: rate.numberOfDays
    });
  }

  closeRateModal() {
    this.showAddRateModal = false;
    this.showEditRateModal = false;
    this.selectedRateId = null;
    this.rateForm.reset();
  }

  submitRateForm() {
    if (this.rateForm.invalid || !this.selectedRoom) return;

    const ratePayload: Rate = {
      ...this.rateForm.value,
      roomId: this.selectedRoom.roomID,
      rateId: this.selectedRateId ?? 0
    };

    if (this.showAddRateModal) {
      this.rateService.AddRate(ratePayload).subscribe(() => {
        this.getRatesForRoom(this.selectedRoom!.roomID);
        this.closeRateModal();
      });
    } else if (this.showEditRateModal && this.selectedRateId !== null) {
      this.rateService.UpdateRate( ratePayload).subscribe(() => {
        this.getRatesForRoom(this.selectedRoom!.roomID);
        this.closeRateModal();
      });
    }
  }

  deleteRate(rateId: number) {
    if (confirm('Are you sure you want to delete this rate?')) {
      this.rateService.DeleteRate(rateId).subscribe(() => {
        if (this.selectedRoom) {
          this.getRatesForRoom(this.selectedRoom.roomID);
        }
      });
    }
  }
}
