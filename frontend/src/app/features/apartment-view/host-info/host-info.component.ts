import { Component } from '@angular/core';
import {AccommodationService} from '../../../core/service/accommodation/accommodation.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-apartment-info',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './host-info.component.html',
  styleUrl: './host-info.component.css'
})
export class HostInfoComponent {
  accommodation: any;
  host: any;
  isPhoneVisible: boolean = false;


  constructor(private accommodationService: AccommodationService) {
  }

  ngOnInit(): void {
    this.accommodation = history.state.accommodation;
    this.host = this.accommodation.owner;

    this.host.occupancyRate = 64;
    this.host.phone = 381641234568;
    this.host.estimatedProfit = 5067;
    this.host.priceHistory = [
      { year: 2017, price: 350000 },
      { year: 2018, price: 450000 },
      { year: 2019, price: 400000 }
    ];
  }

  togglePhoneVisibility() {
    this.isPhoneVisible = !this.isPhoneVisible;
  }
}
