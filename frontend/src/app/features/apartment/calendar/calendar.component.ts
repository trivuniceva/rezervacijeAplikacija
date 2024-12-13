import {Component, Input, OnInit} from '@angular/core';
import { DatePipe, NgForOf } from '@angular/common';
import {SpecialPriceServiceService} from '../../../core/service/special_prices/special-price-service.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  imports: [
    DatePipe,
    NgForOf
  ],
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input() apartment: any;

  currentMonth: Date = new Date();
  selectedDates: Date[] = [];
  reservedDates: Date[] = [];
  isSelecting: boolean = false;  // Praćenje da li korisnik selektuje dane
  startDate: Date | null = null;  // Početni datum selekcije
  datesInMonth: Date[] = [];

  constructor(private specialPriceService: SpecialPriceServiceService) {}

  ngOnInit(): void {
    if (!this.apartment) {
      console.error('Apartment input is not provided!');
      return;
    }

    if (!this.apartment.availabilityList) {
      this.apartment.availabilityList = []; // inicijalizuj ako nije definisan
    }

    this.updateCalendar();
    console.log('Received apartment:', this.apartment);

    if (this.apartment.id) {
      this.getAvailableDates(this.apartment.id);
    }
  }


  getAvailableDates(apartmentId: number): void {
    this.specialPriceService.getReservedDates(apartmentId)
      .subscribe(data => {
        this.reservedDates = data.flatMap(dateRange =>
          this.generateDateRange(new Date(dateRange[0]), new Date(dateRange[1]))
        );
        console.log('Reserved Dates:', this.reservedDates);
      }, error => {
        console.error('Error fetching reserved dates:', error);
      });
  }

  private generateDateRange(startDate: Date, endDate: Date): Date[] {
    const dates: Date[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }



  prevMonth() {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() - 1,
      1
    );
    this.updateCalendar();
  }

  nextMonth() {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      1
    );
    this.updateCalendar();
  }

  updateCalendar() {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    this.datesInMonth = [];
    for (let day = firstDay.getDate(); day <= lastDay.getDate(); day++) {
      this.datesInMonth.push(new Date(year, month, day));
    }
  }

  toggleDateSelection(date: Date) {
    if (!this.apartment) {
      console.error('Apartment is not defined!');
      return;
    }

    if (!this.apartment.availabilityList) {
      console.warn('availabilityList is not initialized. Initializing it now.');
      this.apartment.availabilityList = [];
    }

    const index = this.selectedDates.findIndex(d => this.isSameDay(d, date));
    if (index === -1) {
      this.selectedDates.push(date);
      this.apartment.availabilityList.push(date);
      console.log(this.apartment.availabilityList);
    } else {
      this.selectedDates.splice(index, 1);
      this.apartment.availabilityList.splice(index, 1);
    }
  }


  onMouseDown(date: Date): void {
    this.isSelecting = true;
    this.startDate = date;
    this.toggleDateSelection(date);  // Selektuj odmah kada klikneš na datum
  }

  onMouseUp(): void {
    this.isSelecting = false;
    this.startDate = null;
  }

  onMouseOver(date: Date): void {
    if (this.isSelecting && this.startDate) {
      this.toggleDateSelection(date);
    }
  }

  private isSameDay(d1: Date, d2: Date): boolean {
    return d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear();
  }

  getFormattedDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  isReserved(date: Date): boolean {
    return this.reservedDates.some(d => this.isSameDay(d, date));
  }

  isSelected(date: Date): boolean {
    return this.selectedDates.some(d => this.isSameDay(d, date));
  }
}
