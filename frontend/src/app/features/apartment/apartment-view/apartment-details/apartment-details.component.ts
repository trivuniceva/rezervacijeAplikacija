import { Component } from '@angular/core';
import {Location, NgIf} from '@angular/common';

@Component({
  selector: 'app-apartment-details',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './apartment-details.component.html',
  styleUrl: './apartment-details.component.css'
})
export class ApartmentDetailsComponent {
  accommodation: any;

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.accommodation = history.state.accommodation;
  }

  goBack() {
    this.location.back();  // Vraća korisnika nazad na listu
  }

}
