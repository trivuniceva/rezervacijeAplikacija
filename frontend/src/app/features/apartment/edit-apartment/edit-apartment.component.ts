import { Component, OnInit } from '@angular/core';
import {Location, NgIf} from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';

@Component({
  selector: 'app-edit-apartment',
  standalone: true,
  templateUrl: './edit-apartment.component.html',
  styleUrls: ['./edit-apartment.component.css'],
  imports: [
    FormsModule,
    NgIf
  ]
})
export class EditApartmentComponent implements OnInit {
  accommodation: any = null; // Možete postaviti na podrazumevanu vrednost ako je potrebno
  isEditing: boolean = false;

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.accommodation = history.state.accommodation || {
      name: '',
      description: '',
      location: '',
      amenities: '',
      minGuests: 1,
      maxGuests: 1,
      apartmentType: 'apartment',
      price: 0,
      availability: '',
    };
    console.log('Loaded accommodation:', this.accommodation);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      console.log('Selected files:', files);
      // Ovde dodajte logiku za obradu fajlova (npr. upload na server)
    }
  }

  saveChanges(form: NgForm): void {
    if (form.valid) {
      console.log('Changes saved:', this.accommodation);
      console.log('Form data:', form.value);
      // Dodajte logiku za čuvanje podataka, npr. poziv API-a
    } else {
      console.error('Form is invalid');
    }
  }

  cancel(): void {
    this.location.back();
  }
}
