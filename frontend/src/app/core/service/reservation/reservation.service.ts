import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Reservation {
  id: number;
  accommodation: {
    name: string;
    location: string;
  };
  guest:{
    firstname: string;
    lastname: string;
    email: string;
    profilePic: string;

  }
  startDate: string;
  endDate: string;
  status: string;
  price: number;
  numberOfGuests: number;
  deleted: boolean;
}



@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/api/reservations';

  constructor(private http: HttpClient) { }

  getReservationsForGuest(guestId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/guest/${guestId}`);
  }

  getReservationsForHost(apartmentId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/host/${apartmentId}`);
  }

  updateReservationStatus(reservationId: number, status: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/update-status/${reservationId}/${status}`, {});
  }

  deleteCard(reservationId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/delete-card/${reservationId}`, {});
  }


}
