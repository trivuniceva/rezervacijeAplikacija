import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
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
}

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  getAccommodations(): Observable<Accommodation[]> {

    return this.http.get<Accommodation[]>(`${this.apiUrl}/accommodations`);
  }


  findAccommodationsByHost(email: string) {
    return this.http.get<Accommodation[]>(`${this.apiUrl}/accommodationsByHost?email=${email}`);

  }
}
