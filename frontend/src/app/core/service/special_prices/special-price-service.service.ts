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
    return this.http.get<SpecialPrice[]>(`${this.apiUrl}/available?apartmentId=${apartmentId}`);
  }


}
