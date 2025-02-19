import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SpecialPriceServiceService} from '../../../../core/service/special_prices/special-price-service.service';
import {AuthService} from '../../../../core/service/auth/auth.service';
import {CalendarService} from '../../../../core/service/calendar/calendar.service';
import {CalendarComponent} from '../../calendar/calendar.component';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from '@angular/common';
import {PricingMethodFormatPipe} from '../../../../pipes/pricing-method-format.pipe';

@Component({
  selector: 'app-guest-calendar',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    CurrencyPipe,
    PricingMethodFormatPipe,
  ],
  templateUrl: './guest-calendar.component.html',
  styleUrl: './guest-calendar.component.css'
})
export class GuestCalendarComponent extends CalendarComponent implements OnInit{
  @Input() apartment: any;
  @Output() reservedDaysLstChange = new EventEmitter<Date[]>();
  @Output() fullPriceNum = new EventEmitter<number>();

  srecniVikend: Date[] = [];
  specialPrices: { [key: string]: number } = {};
  fullPrice: number = 0;
  user: any;

  constructor(
    private specialPriceService: SpecialPriceServiceService,
    private authService: AuthService,
    protected override calendarService: CalendarService // Add override
  ) {
    super(calendarService);
  }

  override ngOnInit(): void { // Add override
    this.user = this.authService.getLoggedUser();
    super.ngOnInit();

    if (this.apartment && this.apartment.id) {
      this.loadSpecialPrices(this.apartment.id);
    }
  }

  loadSpecialPrices(accommodationId: number): void {
    this.specialPriceService.getSpecialPricesByAccommodationId(accommodationId).subscribe((data) => {
      data.forEach((item: any) => {
        const startDate = new Date(item.startDate);
        const endDate = new Date(item.endDate);
        const price = item.price;
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
          const formattedDate = this.getFormattedDate(currentDate);
          this.specialPrices[formattedDate] = price;
          currentDate.setDate(currentDate.getDate() + 1);
        }
      });
    });
  }

  toggleDateSelection(date: Date) {
    if (!this.apartment || this.isReserved(date) || this.isUnavailableDate(date)) {
      return;
    }

    if (!this.apartment.availabilityList) {
      this.apartment.availabilityList = [];
    }

    const index = this.srecniVikend.findIndex(d => this.isSameDay(d, date));
    if (index === -1) {
      this.srecniVikend.push(date);
      this.apartment.availabilityList.push(date);
      this.countPrice(date);
    } else {
      this.srecniVikend.splice(index, 1);
      this.apartment.availabilityList.splice(index, 1);
      const dateString = this.formatDate(date);
      const priceToRemove = this.checkIfSpecialPrice(dateString)
        ? this.specialPrices[dateString]
        : this.apartment.defaultPrice;
      this.fullPrice -= priceToRemove;
    }

    this.reservedDaysLstChange.emit(this.srecniVikend);
    this.fullPriceNum.emit(this.fullPrice);
  }

  private formatDate(date: Date): string {
    return this.calendarService.formatDate(date);
  }

  private countPrice(date: Date) {
    const priceToAdd = this.calendarService.countPrice(date, this.apartment, this.specialPrices);
    this.fullPrice += priceToAdd;
  }

  private checkIfSpecialPrice(dateString: string): boolean {
    return this.calendarService.checkIfSpecialPrice(dateString, this.specialPrices);
  }

  isReserved(date: Date): boolean {
    return false; // Gosti ne vide rezervirane datume
  }

  isUnavailableDate(date: Date): boolean {
    return false; // Gosti ne vide nedostupne datume
  }

  isSrecni(date: Date): boolean {
    return this.srecniVikend.some(d => this.isSameDay(d, date));
  }

  protected override isSameDay(d1: Date, d2: Date): boolean {
    return this.calendarService.isSameDay(d1, d2);
  }

  protected override getFormattedDate(date: Date): string {
    return this.calendarService.getFormattedDate(date);
  }



}
