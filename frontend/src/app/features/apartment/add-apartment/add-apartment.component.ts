import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-apartment',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './add-apartment.component.html',
  styleUrl: './add-apartment.component.css'
})
export class AddApartmentComponent {
  apartment = {
    name: '',
    description: '',
    location: '',
    amenities: '',
    minGuests: null,
    maxGuests: null,
    apartmentType: '',
    price: null,
    availability: '',
    photos: []
  };

  onFileSelected(event: any) {
    // const files = event.target.files;
    // this.apartment.photos = Array.from(files);
  }

  addApartment() {
    console.log('Apartment added:', this.apartment);

  }

}
