import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ApartmentImagesComponent} from '../apartment-images/apartment-images.component';
import {ApartmentDetailsComponent} from '../apartment-details/apartment-details.component';
import {HostInfoComponent} from '../host-info/host-info.component';
import {MapSectionComponent} from '../map-section/map-section.component';
import {AmenitiesInfoComponent} from '../amenities-info/amenities-info.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detailed-view',
  standalone: true,
  imports: [
    ApartmentImagesComponent,
    ApartmentDetailsComponent,
    HostInfoComponent,
    MapSectionComponent,
    AmenitiesInfoComponent,
    NgIf
  ],
  templateUrl: './detailed-view-base.component.html',
  styleUrl: './detailed-view-base.component.css'
})
export class DetailedViewBaseComponent implements OnInit {
  accommodation: any;

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.accommodation = history.state.accommodation;
  }

  goBack() {
    this.location.back();  // Vraća korisnika nazad na listu
  }
}
