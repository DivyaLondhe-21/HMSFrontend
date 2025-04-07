import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, RouterModule]
})
export class DashboardComponent {
  role: string = '';
  isReceptionist = false;
  isManager = false;
  isAdmin = false;
  isLoggedIn = false;

  constructor(private router: Router) {}
  ngOnInit() {
    // Fetch role from localStorage or API after login

    this.checkUserStatus();
  }
  checkUserStatus(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
      console.log(token, role);
    if (token) {
      this.isLoggedIn = true;
      this.setRoles(role);
    }
  }
  }

  setRoles(role: string | null): void {
    switch (role) {
      case 'Admin':
        this.isAdmin = true;
        break;
      case 'Manager':
        this.isManager = true;
        break;
      case 'Receptionist':
        this.isReceptionist = true;
        break;
      default:
        this.isAdmin = this.isManager = this.isReceptionist = false;
    }
  }
  // setRolePermissions() {
  //   this.isReceptionist = this.role === 'Receptionist';
  //   this.isManager = this.role === 'Manager';
  //   this.isAdmin = this.role === 'Admin';
  // }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  } 
}
