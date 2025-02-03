import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface Accommodation {
  id: number;
  name: string;
  description: string;
  location: string;
  minGuests: number;
  maxGuests: number;
  type: string;
  approved: boolean;
  amenities: string[];
  photos: string;
  defaultPrice: number;
  pricingMethod: string;
  reservationType: string;
  deadline: number;

}

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getAccommodations(): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>(`${this.apiUrl}/accommodations`);
  }

  findAccommodationsByHost(email: string) {
    return this.http.get<Accommodation[]>(`${this.apiUrl}/accommodationsByHost?email=${email}`);
  }

  createAccommodation(data: any): Observable<any> {
    console.log(data.owner);
    return this.http.post(`${this.apiUrl}/createAccommodation`, data);
  }

  getAccommodationById(id: number): Observable<Accommodation> {
    return this.http.get<Accommodation>(`${this.apiUrl}/accommodationById/${id}`);
  }

  reserveAccommodation(reservationData: any): Observable<any> {
    const url = `${this.apiUrl}/reserve`;
    return this.http.post<any>(url, reservationData);
  }

}
