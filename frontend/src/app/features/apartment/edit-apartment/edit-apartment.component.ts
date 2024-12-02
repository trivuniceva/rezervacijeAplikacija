import {Component, OnInit} from '@angular/core';
import {Location, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SearchAccommodationsComponent} from "../../../shared/search-accommodations/search-accommodations.component";


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

export class EditApartmentComponent implements OnInit{
  apartment: any;
  isEditing: boolean = false;

  constructor(private location: Location) {}

  ngOnInit(): void {
    console.log("caoosssss <33")
    this.apartment = history.state.apartment;
    console.log(this.apartment)
  }

  onFileSelected($event: Event) {


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

  enableEditing() {
    this.isEditing = true;
  }

  deleteApartment() {

  }

  cancelEditing() {
    this.isEditing = false;
  }
}
