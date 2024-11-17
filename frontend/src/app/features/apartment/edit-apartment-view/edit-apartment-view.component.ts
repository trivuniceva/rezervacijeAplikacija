import { Component } from '@angular/core';
import {SearchAccommodationsComponent} from "../../../shared/search-accommodations/search-accommodations.component";

@Component({
  selector: 'app-edit-apartment-view',
  standalone: true,
    imports: [
        SearchAccommodationsComponent
    ],
  templateUrl: './edit-apartment-view.component.html',
  styleUrl: './edit-apartment-view.component.css'
})
export class EditApartmentViewComponent {

}
