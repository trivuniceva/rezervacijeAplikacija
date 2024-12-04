import {Component, OnInit} from '@angular/core';
import {Location, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SearchAccommodationsComponent} from "../../../shared/search-accommodations/search-accommodations.component";
import {PricingAndAvailabilityComponent} from '../pricing-and-availability/pricing-and-availability.component';

@Component({
  selector: 'app-edit-apartment',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    SearchAccommodationsComponent,
    PricingAndAvailabilityComponent,
  ],
  templateUrl: './edit-apartment.component.html',
  styleUrl: './edit-apartment.component.css'
})
export class EditApartmentComponent implements OnInit{
  apartment: any;
  selectedSection: string = 'basic';

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

  showPricingAvailability() {
    this.selectedSection = 'pricing';
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
