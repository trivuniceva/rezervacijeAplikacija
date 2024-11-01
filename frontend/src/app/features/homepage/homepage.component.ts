import { Component } from '@angular/core';
import {CurrencyPipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgForOf
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  featuredApartments = [
    {
      id: 1,
      name: 'Luxury Beachside Villa',
      location: 'Miami, FL',
      price: 300,
      image: '/pics/apartment/a1.jpg'
    },
    {
      id: 2,
      name: 'Cozy Mountain Cabin',
      location: 'Aspen, CO',
      price: 200,
      image: '/pics/apartment/a2.jpg'
    },
    {
      id: 3,
      name: 'Modern City Apartment',
      location: 'New York, NY',
      price: 250,
      image: '/pics/apartment/a3.jpg'
    }
  ];

  navigateToBooking() {
    console.log('Navigating to booking page...');
    // TODO 1:
  }

  viewDetails(apartmentId: number) {
    console.log(`Viewing details for apartment with ID: ${apartmentId}`);
    // TODO 2:
  }
}

