// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class InventoryService {
//   private baseUrl = 'https://localhost:5032/api/inventory';

//   constructor(private http: HttpClient) {}

//   getAllInventory(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.baseUrl}`);
//   }

//   getInventoryByName(itemName: string): Observable<any> {
//     return this.http.get<any>(`${this.baseUrl}/inventory/${itemName}`);
//   }

//   getInventoryByDepartment(departmentName: string): Observable<any[]> {
//     return this.http.get<any[]>(`${this.baseUrl}/inventory/${departmentName}`);
//   }

//   createInventory(item: any): Observable<any> {
//     return this.http.post<any>(`${this.baseUrl}/create`, item);
//   }

//   updateInventory(id: number, item: any): Observable<any> {
//     return this.http.put<any>(`${this.baseUrl}/update/${id}`, item);
//   }

//   deleteInventory(id: number): Observable<any> {
//     return this.http.delete<any>(`${this.baseUrl}/${id}`);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private baseUrl = 'https://localhost:5032/inventory';

  constructor(private http: HttpClient) {}

  getAllInventory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getInventoryByName(itemName: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/by-item/${itemName}`);
  }

  getInventoryByDepartment(departmentName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/by-department/${departmentName}`);
  }
  getInventoryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
  createInventory(item: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, item);
  }

  updateInventory(id: number, item: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, item);
  }

  deleteInventory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
