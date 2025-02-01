import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Reservation {
  accommodation: {
    name: string;
    location: string;
  };
  startDate: string;
  endDate: string;
  status: string;
  price: number;
  numberOfGuests: number;

}



@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/api/reservations/guest';

  constructor(private http: HttpClient) { }

  getReservationsForGuest(guestId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${guestId}`);
  }
}
