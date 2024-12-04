import { Component, OnInit } from '@angular/core';
import { DatePipe, NgForOf } from '@angular/common';

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

  currentMonth: Date = new Date();
  selectedDates: Date[] = [];
  reservedDates: Date[] = [
    new Date(2024, 11, 12),  // Rezervisani dani
    new Date(2024, 11, 14)
  ];
  isSelecting: boolean = false;  // Praćenje da li korisnik selektuje dane
  startDate: Date | null = null;  // Početni datum selekcije
  datesInMonth: Date[] = [];

  ngOnInit(): void {
    this.updateCalendar();
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

  private getDaysInMonth(month: Date): Date[] {
    const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const lastDayOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    const days: Date[] = [];

    for (let d = firstDayOfMonth; d <= lastDayOfMonth; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }

    return days;
  }

  toggleDateSelection(date: Date) {
    const index = this.selectedDates.findIndex(d => this.isSameDay(d, date));
    if (index === -1) {
      // Ako nije selektovan, dodajemo datum
      this.selectedDates.push(date);
    } else {
      // Ako je selektovan, uklanjamo datum
      this.selectedDates.splice(index, 1);
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

  private getDateRange(start: Date, end: Date): Date[] {
    const range: Date[] = [];
    const direction = start <= end ? 1 : -1;
    for (let d = new Date(start); this.isSameDay(d, end) || d <= end; d.setDate(d.getDate() + direction)) {
      range.push(new Date(d));
    }
    return range;
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
