import {Component, OnInit} from '@angular/core';
import {Location, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SearchAccommodationsComponent} from "../../../shared/search-accommodations/search-accommodations.component";
import {SpecialPricing} from '../SpecialPricing/SpecialPricing';
import {CalendarComponent} from '../calendar/calendar.component';
import {Reservation, ReservationService} from '../../../core/service/reservation/reservation.service';
import {
  ReservationReviewComponentComponent
} from '../../reservation/reservation-review-component/reservation-review-component.component';

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
  ],
  templateUrl: './edit-apartment.component.html',
  styleUrl: './edit-apartment.component.css'
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

  cancelEdit() {
    console.log('Edit cancelled');
  }

  onFileSelected($event: Event) {

  }
}
