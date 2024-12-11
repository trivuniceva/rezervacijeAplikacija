import {Component, Input, OnInit} from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CalendarComponent} from '../calendar/calendar.component';

@Component({
  selector: 'app-pricing-and-availability',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    CalendarComponent,
  ],
  templateUrl: './pricing-and-availability.component.html',
  styleUrls: ['./pricing-and-availability.component.css']
})
export class PricingAndAvailabilityComponent implements OnInit {
  @Input() apartment: any;
  price: number = 0;
  pricingMethod: string = 'perGuest';
  cancellationDeadline: string = '';

  ngOnInit(): void {
    console.log('apartmaaaaaan:', this.apartment);
  }

}
