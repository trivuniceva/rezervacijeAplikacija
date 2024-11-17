import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AccommodationService} from '../../../core/service/accommodation/accommodation.service';

@Component({
  selector: 'app-add-apartment',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-apartment.component.html',
  styleUrl: './add-apartment.component.css'
})
export class AddApartmentComponent {
  apartmentForm!: FormGroup;

  constructor(private accommodationService: AccommodationService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.apartmentForm = this.fb.group({
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
    })
  }

  onFileSelected(event: any) {
  }

  addApartment() {
    if(this.apartmentForm.valid){
      const data = {
        name: this.apartmentForm.value.name,
        description: this.apartmentForm.value.description,
        location: this.apartmentForm.value.location,
        amenities: this.apartmentForm.value.amenities,
        minGuests: this.apartmentForm.value.minGuests,
        maxGuests: this.apartmentForm.value.maxGuests,
        apartmentType: this.apartmentForm.value.apartmentType,
        price: this.apartmentForm.value.price,
        availability: this.apartmentForm.value.availability,
      };

      this.accommodationService.addNewApartment(data)
    }
  }

}
