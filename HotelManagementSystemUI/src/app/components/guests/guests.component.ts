import { Component, OnInit } from '@angular/core';
import { GuestService } from '../../services/guests/guests.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-guest',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.css'],
  imports: [CommonModule, FormsModule]
})
export class GuestComponent implements OnInit {
  guests: any[] = [];        // Stores all guests
  filteredGuests: any[] = []; // Stores filtered guests
  filterActive: boolean = false; // To toggle active guest filter

  constructor(private guestService: GuestService) {}

  ngOnInit(): void {
    this.loadGuests(); // Load guests on initialization
  }

  // Load all guests from API
  loadGuests(): void {
    this.guestService.getGuests().subscribe(
      (data) => {
        this.guests = data;
        this.applyFilter(); // Apply initial filter (if any)
      },
      (error) => {
        console.error('Error fetching guests:', error);
      }
    );
  }

  // Toggle active filter and reapply
  toggleFilter(): void {
    this.filterActive = !this.filterActive;
    this.applyFilter();
  }
  hasActiveReservation(guest: any): boolean {
    return guest?.reservations?.some((res: any) => res.status === 'Active');
  }
  // Filter guests based on active status
  applyFilter(): void {
    if (this.filterActive) {
      this.filteredGuests = this.guests.filter((guest) => this.hasActiveReservation(guest));
    } else {
      this.filteredGuests = [...this.guests]; // Show all guests
    }
  }
  

  // Delete a guest
  deleteGuest(id: number): void {
    if (confirm('Are you sure you want to delete this guest?')) {
      this.guestService.deleteGuest(id).subscribe(() => {
        this.loadGuests(); // Reload after deletion
      });
    }
  }
}
