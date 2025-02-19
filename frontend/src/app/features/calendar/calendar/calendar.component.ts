import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from '@angular/common';
import {SpecialPriceServiceService} from '../../../core/service/special_prices/special-price-service.service';
import {AuthService} from '../../../core/service/auth/auth.service';
import {PricingMethodFormatPipe} from '../../../pipes/pricing-method-format.pipe';
import {CalendarService} from '../../../core/service/calendar/calendar.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    CurrencyPipe,
    PricingMethodFormatPipe,

  ],
  styleUrls: ['./calendar.component.css'],
  providers: [CalendarService]
})

export class CalendarComponent implements OnInit {
  currentMonth: Date = new Date();
  datesInMonth: Date[] = [];

  constructor(protected calendarService: CalendarService) {}

  ngOnInit(): void {
    this.updateCalendar();
  }

  prevMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.updateCalendar();
  }

  nextMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
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

  protected isSameDay(d1: Date, d2: Date): boolean {
    return this.calendarService.isSameDay(d1, d2);
  }

  protected getFormattedDate(date: Date): string {
    return this.calendarService.getFormattedDate(date);
  }


}

