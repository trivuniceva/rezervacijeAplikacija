import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CalendarComponent} from '../../calendar/calendar.component';
import {SpecialPriceServiceService} from '../../../../core/service/special_prices/special-price-service.service';
import {AuthService} from '../../../../core/service/auth/auth.service';
import {CalendarService} from '../../../../core/service/calendar/calendar.service';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from '@angular/common';
import {PricingMethodFormatPipe} from '../../../../pipes/pricing-method-format.pipe';

@Component({
  selector: 'app-host-calendar',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    CurrencyPipe,
    PricingMethodFormatPipe,
  ],
  templateUrl: './host-calendar.component.html',
  styleUrl: './host-calendar.component.css'
})
export class HostCalendarComponent extends CalendarComponent implements OnInit{
  @Input() apartment: any;
  @Input() mode: 'pricing' | 'availability' = 'availability';

  @Output() pricingDatesSelected = new EventEmitter<Date[]>();

  unavailabledDates: Date[] = [];
  reservedDates: Date[] = [];
  specialPrices: { [key: string]: number } = {};
  user: any;
  selectedPricingDates: Date[] = [];


  constructor(
    private specialPriceService: SpecialPriceServiceService,
    private authService: AuthService,
    protected override calendarService: CalendarService // Added override
  ) {
    super(calendarService);
  }

  override ngOnInit(): void { // Added override
    this.user = this.authService.getLoggedUser();
    super.ngOnInit();

    if (this.apartment && this.apartment.id) {
      this.getReservedDates(this.apartment.id);
      this.loadSpecialPrices(this.apartment.id);
      this.getUnavailableDates(this.apartment.id);
    }
  }

  getReservedDates(apartmentId: number): void {
    this.specialPriceService.getReservedDatesByApartmentId(apartmentId)
      .subscribe(data => {
        this.reservedDates = data.flatMap(dateRange =>
          this.calendarService.generateDateRange(new Date(dateRange[0]), new Date(dateRange[1]))
        );
      }, error => {
        console.error('Error fetching reserved dates:', error);
      });
  }

  getUnavailableDates(apartmentId: number): void {
    this.specialPriceService.getUnavailableDates(apartmentId)
      .subscribe(data => {
        this.unavailabledDates = data.flatMap(dateRange =>
          this.calendarService.generateDateRange(new Date(dateRange[0]), new Date(dateRange[1]))
        );
      }, error => {
        console.error('Error fetching unavailable dates:', error);
      });
  }

  loadSpecialPrices(accommodationId: number): void {
    this.calendarService.loadSpecialPrices(accommodationId).subscribe((specialPrices) => {
      this.specialPrices = specialPrices;
      console.log("Special prices in component:", this.specialPrices);
    });
  }

  toggleDateSelection(date: Date) {
    if (!this.apartment || !this.user || this.isReserved(date)) {
      return;
    }

    if (!this.apartment.availabilityList) {
      this.apartment.availabilityList = [];
    }

    if(this.mode === 'availability'){
      this.handleAvailability(date);
      this.sendSelectedDatesToBackend();

    } else if(this.mode === 'pricing'){
      this.handlePricing(date);
      this.sendPricingToBackend()
    }
  }

  handleAvailability(date: Date){
    const index = this.unavailabledDates.findIndex(d => this.isSameDay(d, date));

    if (index === -1) {
      this.unavailabledDates.push(date);
      this.apartment.availabilityList.push(date);
    } else {
      this.unavailabledDates.splice(index, 1);
      this.apartment.availabilityList.splice(index, 1);
    }
  }

  handlePricing(date: Date){
    const index = this.selectedPricingDates.findIndex(d => this.isSameDay(d, date));

    if (index === -1) {
      this.selectedPricingDates.push(date);
    } else {
      this.selectedPricingDates.splice(index, 1);
    }
  }

  sendSelectedDatesToBackend() {
    if (this.apartment && this.apartment.id) {
      this.specialPriceService.updateAvailability(this.apartment.id, this.unavailabledDates)
        .subscribe(response => {
          console.log('Dates updated successfully', response);
        }, error => {
          console.error('Error updating dates', error);
        });
    } else {
      console.error("Apartment or apartment ID is missing. Cannot update availability.");
    }
  }

  sendPricingToBackend() {
    if (this.apartment && this.apartment.id) {
      this.pricingDatesSelected.emit(this.selectedPricingDates);
    } else {
      console.error("Apartment or apartment ID is missing. Cannot update pricing.");
    }

  }

  isReserved(date: Date): boolean {
    return this.reservedDates.some(d => this.isSameDay(d, date));
  }

  isUnavailableDate(date: Date): boolean {
    return this.unavailabledDates.some(d => this.isSameDay(d, date));
  }

  isPricingDateSelected(date: Date): boolean {
    return this.selectedPricingDates.some(d => this.isSameDay(d, date));
  }

  isSelected(date: Date): boolean {
    if (this.mode === 'availability') {
      return this.isUnavailableDate(date);
    } else if (this.mode === 'pricing') {
      return this.isPricingDateSelected(date);
    }
    return false;
  }

}
