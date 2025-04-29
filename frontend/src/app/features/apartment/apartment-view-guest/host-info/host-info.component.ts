import { Component } from '@angular/core';
import {AccommodationService} from '../../../../core/service/accommodation/accommodation.service';
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

    if (!this.accommodation) {
      console.error('Accommodation data is missing in history state!');
      return;
    }

    this.host = this.accommodation.owner || {};

    this.host.occupancyRate = this.host.occupancyRate || 0;
    this.host.phone = this.host.phone || null;
    this.host.estimatedProfit = this.host.estimatedProfit || 0;
    this.host.priceHistory = this.host.priceHistory || [];

    if (this.host.priceHistory.length === 0) {
      this.host.priceHistory = [
        { year: 2017, price: 350000 },
        { year: 2018, price: 450000 },
        { year: 2019, price: 400000 }
      ];
    }
  }

  togglePhoneVisibility() {
    this.isPhoneVisible = !this.isPhoneVisible;
  }
}
