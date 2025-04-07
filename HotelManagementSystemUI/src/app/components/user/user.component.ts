import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/userService/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface User {
  userId: number;
  name: string; 
  email: string;
  password?: string; // Optional property
  role: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule]
})

export class UserComponent implements OnInit {
  users: User[] = [];
  newUser: User = { userId: 0, name: '', email: '', password: '', role: '' };
  selectedUser: User | null = null;
  errorMessage = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        this.errorMessage = 'Error fetching users';
      }
    );
  }

  addUser(): void {
    if (this.newUser.email && this.newUser.password && this.newUser.role) {
      this.userService.addUser(this.newUser).subscribe(
        (user) => {
          this.users.push(user);
          this.newUser = { userId: 0, name:'', email: '', password: '', role: '' }; // Reset form
        },
        (error) => {
          this.errorMessage = 'Error adding user';
        }
      );
    }
  }

  editUser(user: User): void {
    this.selectedUser = { ...user }; // Create a copy for editing
  }

  updateUser(): void {
    if (this.selectedUser) {
      this.userService.updateUser(this.selectedUser).subscribe(
        () => {
          this.loadUsers(); // Refresh users
          this.selectedUser = null; // Close edit form
        },
        (error) => {
          this.errorMessage = 'Error updating user';
        }
      );
    }
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.users = this.users.filter((user) => user.userId !== userId);
      },
      (error) => {
        this.errorMessage = 'Error deleting user';
      }
    );
  }
}