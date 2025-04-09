import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RoomService } from '../../services/roomService/room.service';
import { Room } from '../../models/room.models';
import { Rate } from '../../models/rate.models';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class RoomComponent implements OnInit {
  rooms: Room[] = [];
  rates: Rate[] = [];

  showRatesModal = false;
  showAddRoomModal = false;
  showEditRoomModal = false;

  selectedRoom: Room | null = null;

  roomForm: FormGroup;

  constructor(private fb: FormBuilder, private roomService: RoomService) {
    this.roomForm = this.fb.group({
      roomID: [0],
      roomType: ['', Validators.required],
      availability: [true, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllRooms();
  }

  getAllRooms(): void {
    this.roomService.getAllRooms().subscribe((data: Room[]) => {
      this.rooms = data;
    });
  }

  openAddRoomModal(): void {
    this.showAddRoomModal = true;
    this.showEditRoomModal = false;
    this.roomForm.reset({
      roomID: 0,
      roomType: '',
      availability: true
    });
  }

  openEditRoomModal(room: Room): void {
    this.showEditRoomModal = true;
    this.showAddRoomModal = false;
    this.selectedRoom = room;

    this.roomForm.patchValue({
      roomID: room.roomID,
      roomType: room.roomType,
      availability: room.availability
    });
  }

  closeModal(): void {
    this.showAddRoomModal = false;
    this.showEditRoomModal = false;
    this.roomForm.reset();
    this.selectedRoom = null;
  }

  submitForm(): void {
    if (this.roomForm.invalid) return;

    const roomData: Room = this.roomForm.value;

    if (this.showAddRoomModal) {
      this.roomService.addRoom(roomData).subscribe(() => {
        this.getAllRooms();
        this.closeModal();
      });
    } else if (this.showEditRoomModal && this.selectedRoom) {
      this.roomService.updateRoom(roomData.roomID, roomData).subscribe(() => {
        this.getAllRooms();
        this.closeModal();
      });
    }
  }

  deleteRoom(roomID: number): void {
    if (confirm('Are you sure you want to delete this room?')) {
      this.roomService.deleteRoom(roomID).subscribe(() => {
        this.getAllRooms();
      });
    }
  }

  getRatesForRoom(roomID: number): void {
    this.roomService.getRatesForRoom(roomID).subscribe((rates: Rate[]) => {
      this.rates = rates || [];
      this.selectedRoom = this.rooms.find(r => r.roomID === roomID) || null;
      this.showRatesModal = true;
    });
  }

  closeRatesModal(): void {
    this.showRatesModal = false;
    this.selectedRoom = null;
    this.rates = [];
  }
}
