import {Component, Input, OnInit} from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CalendarComponent} from '../calendar/calendar.component';
import {SpecialPriceServiceService} from '../../../core/service/special_prices/special-price-service.service';

@Component({
  selector: 'app-pricing-and-availability',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    CalendarComponent,
  ],
  templateUrl: './SpecialPricing.html',
  styleUrls: ['./SpecialPricing.css']
})
export class SpecialPricing implements OnInit {
  @Input() apartment: any;
  price: number = 0;
  pricingMethod: string = 'perGuest';
  cancellationDeadline: string = '';

  constructor(private specialPriceService: SpecialPriceServiceService) {}

  ngOnInit(): void {
    console.log('apartmaaaaaan:', this.apartment);
  }

  sendToBackend() {
    if (!this.apartment) {
      console.error('Apartment data is missing!');
      return;
    }

    const payload = {
      apartmentId: this.apartment.id,
      price: this.price,
      pricingMethod: this.pricingMethod,
      cancellationDeadline: this.cancellationDeadline,
      availabilityList: this.apartment.availabilityList || []
    };

    this.specialPriceService
      .createSpecialPrice(payload)
      .subscribe(
        response => {
          console.log('Data sent successfully:', response);
        },
        error => {
          console.error('Error sending data:', error);
        }
      );
  }
}