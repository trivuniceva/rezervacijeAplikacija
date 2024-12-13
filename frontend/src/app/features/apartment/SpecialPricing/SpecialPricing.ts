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
      alert('Apartment data is missing!');
      return;
    }

    const payload = {
      apartmentId: this.apartment.id,
      price: this.price,
      pricingMethod: this.pricingMethod,
      cancellationDeadline: this.cancellationDeadline,
      availabilityList: this.apartment.availabilityList || []
    };

    this.specialPriceService.createSpecialPrice(payload).subscribe(
      response => {
        if (typeof response === 'string' || (response && response.message)) {
          alert('Data has been sent successfully!');
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
