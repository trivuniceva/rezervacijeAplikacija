import { Component, OnInit, Input } from '@angular/core';
import { Location, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

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
  @Input() accommodation: any = null;  // Ovdje primaš podatke o apartmanu
  isEditing: boolean = false;

  constructor(private location: Location) {}

  ngOnInit(): void {
    // Nema potrebe za istorijom, jer podatke sada primaš kroz @Input
    console.log('Loaded accommodation:', this.accommodation);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      console.log('Selected files:', files);
    }
  }

  saveChanges(form: NgForm): void {
    if (form.valid) {
      console.log('Changes saved:', this.accommodation);
      console.log('Form data:', form.value);
    } else {
      console.error('Form is invalid');
    }
  }

  cancel(): void {
    this.location.back();
  }
}
