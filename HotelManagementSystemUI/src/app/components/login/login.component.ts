import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/userService/user.service';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports:[CommonModule, RouterModule, FormsModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}


  login() {
      const loginData = {
        username: this.email,
        password: this.password
      };
      
      this.userService.login(loginData).subscribe({
        next: (response: any) => {
          console.log('Login successful:', response);
          // Store JWT token if needed
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          // Navigate to dashboard or any other page
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.errorMessage = 'Invalid username or password!';
        },
        complete: () => {
          console.log('Login request completed.');
        }
     });
  }
}
