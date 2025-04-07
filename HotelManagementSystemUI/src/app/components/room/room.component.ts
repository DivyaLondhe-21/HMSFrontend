import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/roomService/room.service';
import { CommonModule } from '@angular/common';
import { RateComponent } from './rate/rate.component';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Room } from '../../models/room.models';
import { Rate } from '../../models/rate.models';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  imports: [CommonModule, RateComponent, FormsModule, ReactiveFormsModule]
})
export class RoomComponent implements OnInit {
  rooms: Room[] = [];
  rates: Rate[] = [];
  room: Room = this.initializeRoom();
  selectedRoom: Room | null = null;
  showRatesModal: boolean = false;
  showAddRoomModal: boolean = false;
  showEditRoomModal: boolean = false;
  newRoom: Room = this.initializeRoom();
  //rooms = [
    //{ roomID: 1, roomType: 'Single', checkInDate: '2025-04-01', checkOutDate: '2025-04-05', availability: true },
   // { roomID: 2, roomType: 'Double', checkInDate: '2025-04-02', checkOutDate: '2025-04-06', availability: true },
    // Add more rooms as needed
  //];
  editRoomForm: FormGroup;
  //constructor(private roomService: RoomService) {}
  constructor(private fb: FormBuilder, private roomService: RoomService) {
    // Initialize the form with empty values or default validators
    this.editRoomForm = this.fb.group({
      roomID: ['', Validators.required],
      roomType: ['', Validators.required],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      availability: [false, Validators.required],
    });
  }
  ngOnInit(): void {
    this.GetAllRooms();
  }
  openAddRoomModal(): void {
    this.showAddRoomModal = true;
    this.resetForm();
  }

  closeAddRoomModal(): void {
    this.showAddRoomModal = false;
    this.showEditRoomModal = false;
  }
  GetAllRooms(): void {
    this.roomService.GetAllRooms().subscribe((data: Room[]) => {
      this.rooms = data;
    });
  }

  GetRoomById(roomId: number): void {
    this.roomService.GetRoomById(roomId).subscribe((room: Room) => {
      this.room = room;
      console.log('Room details:', room);
    }
    );
  }

  GetRatesForRoom(roomID: number): void {   
    this.roomService.GetRatesForRoom(roomID).subscribe(
      (rates) => {
        // Handle the fetched room rates
        console.log(`Rates for room ${roomID}:`, rates);
        this.rates = rates || []; // Ensure rates is always an array (empty array if undefined)
        this.selectedRoom = this.rooms.find(room => room.roomID === roomID) || null; // Find the room by ID
        this.showRatesModal = true; // Show the modal to display rates
      },
      (error) => {
        console.error('Error fetching room rates:', error);
      }
    );
  }
  onSubmit(): void {
    if (this.selectedRoom) {
      this.UpdateRoom();
    } else {
      this.AddRoom();
    }
  }

  AddRoom(): void {
    this.roomService.AddRoom(this.room).subscribe(() => {
      this.GetAllRooms();
      this.resetForm();
    });
  }

  editRoom(room: Room): void {
    this.selectedRoom = room; // Set the selected room
    // Populate the form with the current room values
    this.editRoomForm.patchValue({
      roomID: room.roomID,
      roomType: room.roomType,
      checkInDate: room.checkInDate,
      checkOutDate: room.checkOutDate,
      availability: room.availability,
    });
  }

  UpdateRoom(): void {
    if (this.editRoomForm.valid) {
      const updatedRoom = this.editRoomForm.value;
      const index = this.rooms.findIndex((room) => room.roomID === updatedRoom.roomID);
      if (index !== -1) {
        this.rooms[index] = updatedRoom; // Update the room data
      }
      this.selectedRoom = null; // Clear the selected room
    }
  }

  DeleteRoom(roomId: number): void {
    if (confirm('Are you sure you want to delete this room?')) {
      this.roomService.DeleteRoom(roomId).subscribe(() => {
        this.GetAllRooms();
      });
    }
  }

  resetForm(): void {
    this.room = this.initializeRoom();
    this.selectedRoom = null;
  }
  cancelEdit(): void {
    this.showAddRoomModal = false;
    this.showEditRoomModal = false;
  }
  closeRatesModal(): void {
    this.showRatesModal = false; // Hide the modal
    this.rates = []; // Clear the rates
    this.selectedRoom = null; // Clear the selected room
  }
  initializeRoom(): Room {
    return {
      roomID: 0,
      roomType: '',
      checkInDate: '',
      checkOutDate: '',
      availability: true,
    };
  }
}

