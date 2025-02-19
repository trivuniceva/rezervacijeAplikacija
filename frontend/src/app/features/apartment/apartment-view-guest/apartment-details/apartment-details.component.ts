import { Component } from '@angular/core';
import {Location, NgIf} from '@angular/common';
import {PricingMethodFormatPipe} from "../../../../pipes/pricing-method-format.pipe";

@Component({
  selector: 'app-apartment-details',
  standalone: true,
    imports: [
        NgIf,
        PricingMethodFormatPipe
    ],
  templateUrl: './apartment-details.component.html',
  styleUrl: './apartment-details.component.css'
})
export class ApartmentDetailsComponent {
  accommodation: any;
  displayDetails: boolean = false;
  displayDescription: boolean = false;

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.accommodation = history.state.accommodation;
  }

  showDetails() {
    this.displayDetails = true;
    this.displayDescription = false;
  }

  showDescription() {
    this.displayDescription = true;
    this.displayDetails = false;
  }

}
