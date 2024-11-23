import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { AccommodationService } from '../../../core/service/accommodation/accommodation.service';
import {NgIf} from '@angular/common';

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
export class AddApartmentComponent implements OnInit {
  apartmentForm!: FormGroup;

  constructor(private accommodationService: AccommodationService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.apartmentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      location: ['', [Validators.required]],
      amenities: [''],
      minGuests: [1, [Validators.required, Validators.min(1)]],
      maxGuests: [1, [Validators.required, Validators.min(1)]],
      apartmentType: ['', [Validators.required]],
      price: [null, [Validators.required, Validators.min(0)]],
      availability: ['', [Validators.required]],
      photos: ['']
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    console.log('Selected file:', file);
  }

  addApartment(): void {
    if (this.apartmentForm.valid) {
      const formData = {
        ...this.apartmentForm.value,
        amenities: this.apartmentForm.value.amenities.split(',').map((item: string) => item.trim()) // Razdvajanje pogodnosti
      };

      this.accommodationService.createAccommodation(formData).subscribe({
        next: (response) => {
          console.log('Accommodation created:', response);
          alert('Apartment successfully created!');
          this.apartmentForm.reset(); // resetuj formu
        },
        error: (err) => {
          console.error('Error creating accommodation:', err);
        }
      });
    } else {
      console.error('Form is invalid!');
    }
  }
}
