import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { User } from '../services/user.service';

// Define the User interface
interface User {
  userId: number; // Adjust the property names as per your API
  name: string;
  email: string;
  password? : string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:5032/user'; // Adjust the base URL as per your API

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  // Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`, this.httpOptions);
  }

  // Get a single user by ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`, this.httpOptions);
  }

  // Register a new user
  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, user, this.httpOptions);
  }

  // Login user
  login(loginData:any): Observable<any> {
    console.log('Login data:', loginData);
    return this.http.post<any>(`${this.baseUrl}/login`,   {
      email: loginData.username,   
      password: loginData.password
    }, this.httpOptions);
  }

  // Add user
  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/add`, user, this.httpOptions);
    
  }

  // Update user
  updateUser(user: User): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${user.userId}`, user, this.httpOptions);
  }

  // Delete user
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, this.httpOptions);
  }
}

