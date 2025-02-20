import {Component, OnInit} from '@angular/core';
import {DatePipe, Location, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SearchAccommodationsComponent} from "../../../shared/search-accommodations/search-accommodations.component";
import {SpecialPricing} from '../SpecialPricing/SpecialPricing';
import {Reservation, ReservationService} from '../../../core/service/reservation/reservation.service';
import {
  ReservationReviewComponentComponent
} from '../../reservation/reservation-review-component/reservation-review-component.component';
import {CalendarComponent} from '../../calendar/calendar/calendar.component';
import {HostCalendarComponent} from "../../calendar/pages/host-calendar/host-calendar.component";

@Component({
  selector: 'app-edit-apartment',
  standalone: true,
    imports: [
        NgIf,
        FormsModule,
        SearchAccommodationsComponent,
        SpecialPricing,
        CalendarComponent,
        ReservationReviewComponentComponent,
        HostCalendarComponent,
    ],
  templateUrl: './edit-apartment.component.html',
  styleUrl: './edit-apartment.component.css',
  providers: [DatePipe]
})
export class EditApartmentComponent implements OnInit{
  apartment: any;
  selectedSection: string = 'basic';

  rezervacije: Reservation[] = [];

  constructor(private location: Location) {}

  ngOnInit(): void {
    console.log("caoosssss <33")
    this.apartment = history.state.apartment;
    console.log(this.apartment)

    console.log("Reservation type: ", this.apartment.reservationType);

  }


  showBasicInfo() {
    this.selectedSection = 'basic';
  }

  showMoreInfo() {
    this.selectedSection = 'more';
  }

  showPricing() {
    this.selectedSection = 'pricing';
  }

  showAvailability() {
    this.selectedSection = 'availability';
  }

  showPriceReview() {
    this.selectedSection = 'priceReview';
  }

  saveApartment() {
    console.log('Apartment saved:', this.apartment);

  }

  onFileSelected($event: Event) {

  }
}
