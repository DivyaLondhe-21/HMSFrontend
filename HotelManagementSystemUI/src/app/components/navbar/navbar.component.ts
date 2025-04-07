import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
    isLoggedIn = false;
    isAdmin = false;
    isManager = false;
    isReceptionist = false;
  
    constructor(private router: Router) {}
  
    ngOnInit(): void {
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
  
    logout(): void {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    }
  }

