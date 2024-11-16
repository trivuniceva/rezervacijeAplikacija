import { Component } from '@angular/core';
import {AccommodationService} from '../../../core/service/accommodation/accommodation.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-apartment-info',
  standalone: true,
  imports: [
    NgIf
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
  }


  togglePhoneVisibility() {
    this.isPhoneVisible = !this.isPhoneVisible;
  }
}
