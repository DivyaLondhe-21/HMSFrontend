// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Room } from '../../models/room.models';

// @Injectable({
//   providedIn: 'root',
// })
// export class RoomService {
//   private apiUrl = 'http://localhost:5032/rooms';

//   constructor(private http: HttpClient) {}

//   GetAllRooms(): Observable<Room[]> {
//     return this.http.get<Room[]>(`${this.apiUrl}/all`);
//   }

//   GetRoomById(roomId: number): Observable<Room> {
//     return this.http.get<Room>(`${this.apiUrl}/${roomId}`);
//   }

//   AddRoom(room: Room): Observable<Room> {
//     return this.http.post<Room>(`${this.apiUrl}/add`, room);
//   }

//   GetRatesForRoom(roomID: number): Observable<any> {
//     return this.http.get(`${this.apiUrl}/${roomID}/rates`);
//   }
//   // createRoom(room: Room): Observable<Room> {
//   //   return this.http.post<Room>(`${this.apiUrl}/create`, room);
//   // }

//   UpdateRoom(roomId: number, room: Room): Observable<void> {
//     return this.http.put<void>(`${this.apiUrl}/update/${roomId}`, room);
//   }

//   DeleteRoom(roomId: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/remove/${roomId}`);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Room } from '../../models/room.models';
import { Rate } from '../../models/rate.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:5032/rooms'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl);
  }

  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/get/${id}`);
  }

  addRoom(room: Room): Observable<any> {
    return this.http.post(this.apiUrl, room);
  }

  updateRoom(id: number, room: Room): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, room);
  }

  deleteRoom(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getRatesForRoom(roomID: number): Observable<Rate[]> {
    return this.http.get<Rate[]>(`${this.apiUrl}/${roomID}/rates`);
  }
  
}
