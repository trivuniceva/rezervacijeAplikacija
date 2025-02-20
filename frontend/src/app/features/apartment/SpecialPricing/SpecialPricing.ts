import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DatePipe, NgIf} from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import {SpecialPriceServiceService} from '../../../core/service/special_prices/special-price-service.service';
import {CalendarComponent} from '../../calendar/calendar/calendar.component';
import {HostCalendarComponent} from '../../calendar/pages/host-calendar/host-calendar.component';
import {PricingMethodFormatPipe} from '../../../pipes/pricing-method-format.pipe';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-pricing-and-availability',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    CalendarComponent,
    HostCalendarComponent,
    DatePipe,
    PricingMethodFormatPipe

  ],
  templateUrl: './SpecialPricing.html',
  styleUrls: ['./SpecialPricing.css']
})
export class SpecialPricing implements OnInit {
  @Input() apartment: any;
  price: number = 0;
  pricingMethod: string = '';
  cancellationDeadline: string = '';
  selectedPricingDates: Date[] = [];

  @ViewChild(HostCalendarComponent) hostCalendarComponent!: HostCalendarComponent;
  @ViewChild('pricingForm') pricingForm!: NgForm;

  private destroy$ = new Subject<void>();

  constructor(private specialPriceService: SpecialPriceServiceService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.cancellationDeadline = this.apartment.deadline;
    this.initializePricingMethod();
    console.log('apartmaaaaaan:', this.apartment);
    this.price = this.apartment.defaultPrice;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initializePricingMethod() {
    if (this.apartment && this.apartment.pricingMethod) {
      this.pricingMethod = new PricingMethodFormatPipe().transform(this.apartment.pricingMethod).toLowerCase().replace(/\s/g, ''); // Use pipe and format
    }
  }

  onPricingDatesSelected(dates: Date[]) {
    this.selectedPricingDates = dates;
    console.log("Selected pricing dates in SpecialPricing:", this.selectedPricingDates);
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  sendToBackend() {
    if (!this.apartment) {
      alert('Apartment data is missing!');
      return;
    }

    if (!this.pricingForm.valid || this.selectedPricingDates.length === 0) {
      alert('Please fill in the price, select a pricing method, and select at least one date.');
      return;
    }

    const formattedDates = this.selectedPricingDates.map(date => this.formatDate(date)); // Format dates

    const payload = {
      apartmentId: this.apartment.id,
      price: this.price,
      pricingMethod: this.pricingMethod,
      cancellationDeadline: this.cancellationDeadline,
      availabilityList: formattedDates
    };

    console.log("payload:    " + payload.availabilityList);
    console.log("payload:    " + payload.cancellationDeadline);
    console.log("payload:    " + payload.pricingMethod);
    console.log("payload:    " + payload.price);

    this.specialPriceService.createSpecialPrice(payload).subscribe(
      response => {
        if (typeof response === 'string' || (response && response.message)) {
          alert('Data has been sent successfully!');
          this.hostCalendarComponent.loadSpecialPrices(this.apartment.id); // Reload special prices
          this.hostCalendarComponent.getReservedDates(this.apartment.id); // Reload reserved dates if needed
          this.hostCalendarComponent.getUnavailableDates(this.apartment.id);

          this.selectedPricingDates = [];
          this.hostCalendarComponent.selectedPricingDates = [];
        } else {
          alert('Unexpected response from server.');
        }
        console.log('Data sent successfully:', response);
      },
      error => {
        alert('An error occurred while sending data. Please try again.'); // Error message
        console.error('Error sending data:', error);
      }
    );
  }

}
