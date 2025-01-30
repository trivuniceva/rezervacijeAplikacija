import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface SpecialPrice {
  id: number;
  accommodation_id: number;
  startDate: string;
  dateEnd: string;
  price: number;
  availability: 'AVAILABLE' | 'NOT_AVAILABLE';
}

@Injectable({
  providedIn: 'root'
})
export class SpecialPriceServiceService {
  private apiUrl = 'http://localhost:8080/api/special-prices';

  constructor(private http: HttpClient) { }

  getAvailableSpecialPrices(apartmentId: number): Observable<SpecialPrice[]> {
    return this.http.get<SpecialPrice[]>(`${this.apiUrl}/pricesSSS?apartmentId=${apartmentId}`);
  }

  getReservedDates(apartmentId: number): Observable<Date[][]> {
    return this.http.get<Date[][]>(`${this.apiUrl}/reservedDates?apartmentId=${apartmentId}`);
  }

  getUnavailableDates(apartmentId: number): Observable<Date[][]> {
    return this.http.get<Date[][]>(`${this.apiUrl}/unavailableDates?apartmentId=${apartmentId}`);
  }

  createSpecialPrice(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, payload);
  }

  updateAvailability(apartmentId: number, dates: Date[]): Observable<any> {
    // datumi u ISO stringove za slanje
    const formattedDates = dates.map(date => date.toISOString());
    return this.http.post(`${this.apiUrl}/update-availability`, { apartmentId, dates: formattedDates });
  }

  getSpecialPricesByAccommodationId(accommodationId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/prices/${accommodationId}`);
  }



}
