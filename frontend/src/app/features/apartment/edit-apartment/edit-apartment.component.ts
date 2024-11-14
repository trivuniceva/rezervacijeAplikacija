import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SearchAccommodationsComponent} from "../../../shared/search-accommodations/search-accommodations.component";

@Component({
  selector: 'app-edit-apartment',
  standalone: true,
    imports: [
        NgIf,
        FormsModule,
        SearchAccommodationsComponent
    ],
  templateUrl: './edit-apartment.component.html',
  styleUrl: './edit-apartment.component.css'
})
export class EditApartmentComponent {
  apartment: any;
  isEditing: boolean = false;

  onFileSelected($event: Event) {

  }

  saveChanges() {

  }
}
