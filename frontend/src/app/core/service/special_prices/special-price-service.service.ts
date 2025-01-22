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
    return this.http.get<SpecialPrice[]>(`${this.apiUrl}/prices?apartmentId=${apartmentId}`);
  }

  getReservedDates(apartmentId: number): Observable<Date[][]> {
    return this.http.get<Date[][]>(`${this.apiUrl}/reservedDates?apartmentId=${apartmentId}`);
  }

  getAvailableDates(apartmentId: number): Observable<Date[][]> {
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

  getSpecialPricesForMonth(currentMonth: Date): Observable<any> {
    // your previous code...
    const specialPrices = [
      { start_date: '2025-01-01', end_date: '2025-01-10', price: 100 },
      { start_date: '2025-01-05', end_date: '2025-01-15', price: 120 },
      { start_date: '2025-01-20', end_date: '2025-01-25', price: 150 },
      { start_date: '2025-02-01', end_date: '2025-02-10', price: 130 },
      { start_date: '2025-03-01', end_date: '2025-03-10', price: 140 }
    ];

    return new Observable(observer => {
      const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
      const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

      const filteredPrices = specialPrices.filter(price => {
        const startDate = new Date(price.start_date);
        const endDate = new Date(price.end_date);
        return (startDate <= endOfMonth && endDate >= startOfMonth);
      });

      observer.next(filteredPrices);
      observer.complete();
    });
  }



}
