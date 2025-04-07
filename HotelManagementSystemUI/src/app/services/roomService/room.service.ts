import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../../models/room.models';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private apiUrl = 'http://localhost:5032/rooms';

  constructor(private http: HttpClient) {}

  GetAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/all`);
  }

  GetRoomById(roomId: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/${roomId}`);
  }

  AddRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(`${this.apiUrl}/add`, room);
  }

  GetRatesForRoom(roomID: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${roomID}/rates`);
  }
  // createRoom(room: Room): Observable<Room> {
  //   return this.http.post<Room>(`${this.apiUrl}/create`, room);
  // }

  UpdateRoom(roomId: number, room: Room): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update/${roomId}`, room);
  }

  DeleteRoom(roomId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove/${roomId}`);
  }
}

