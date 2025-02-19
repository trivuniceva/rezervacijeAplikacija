import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {SpecialPriceServiceService} from '../special_prices/special-price-service.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private specialPriceService: SpecialPriceServiceService) { }

  generateDateRange(startDate: Date, endDate: Date): Date[] {
    const dates: Date[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }

  formatDate(date: Date): string {
    const day = String(date.getDate());
    const month = String(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;  // Format: D/M/YYYY
  }

  isSameDay(d1: Date, d2: Date): boolean {
    return d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear();
  }

  getFormattedDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  checkIfSpecialPrice(dateString: string, specialPrices: { [key: string]: number }): boolean {
    const specialPriceKeys = Object.keys(specialPrices);

    if (specialPriceKeys.includes(dateString)) {
      console.log("---------------------");
      console.log("Special price found for " + dateString);
      console.log(specialPrices[dateString]);
      return true;
    } else {
      console.log("Date not found in special prices");
      return false;
    }
  }

  countPrice(date: Date, apartment: any, specialPrices: { [key: string]: number }): number {
    const dateString = this.formatDate(date);
    if (this.checkIfSpecialPrice(dateString, specialPrices)) {
      return specialPrices[dateString];
    } else {
      return apartment.defaultPrice;
    }
  }

  loadSpecialPrices(accommodationId: number): Observable<{ [key: string]: number }> {
    return this.specialPriceService.getSpecialPricesByAccommodationId(accommodationId).pipe(
      map((data: any[]) => { // Type the data correctly if possible
        const specialPrices: { [key: string]: number } = {};
        data.forEach((item: any) => {
          const startDate = new Date(item.startDate);
          const endDate = new Date(item.endDate);
          const price = item.price;
          let currentDate = new Date(startDate);
          while (currentDate <= endDate) {
            const formattedDate = this.getFormattedDate(currentDate);
            specialPrices[formattedDate] = price;
            currentDate.setDate(currentDate.getDate() + 1);
          }
        });
        return specialPrices;
      })
    );
  }


}
