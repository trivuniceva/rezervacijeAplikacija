import {Component, OnInit} from '@angular/core';
import {Location, NgIf} from '@angular/common';
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

  }

  saveChanges() {

  }
}
