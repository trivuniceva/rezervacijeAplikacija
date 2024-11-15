import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {ApartmentImagesComponent} from '../apartment-images/apartment-images.component';
import {ApartmentDetailsComponent} from '../apartment-details/apartment-details.component';
import {ApartmentInfoComponent} from '../apartment-info/apartment-info.component';
import {MapSectionComponent} from '../map-section/map-section.component';
import {AmenitiesInfoComponent} from '../amenities-info/amenities-info.component';

@Component({
  selector: 'app-detailed-view',
  standalone: true,
  imports: [
    ApartmentImagesComponent,
    ApartmentDetailsComponent,
    ApartmentInfoComponent,
    MapSectionComponent,
    AmenitiesInfoComponent
  ],
  templateUrl: './detailed-view.component.html',
  styleUrl: './detailed-view.component.css'
})
export class DetailedViewComponent {

}
