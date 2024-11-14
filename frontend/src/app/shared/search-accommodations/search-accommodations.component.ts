import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {AuthService} from '../../core/service/auth/auth.service';
import {Router} from '@angular/router';
import {Accommodation, AccommodationService} from '../../core/service/accommodation/accommodation.service';


@Component({
  selector: 'app-search-accommodations',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './search-accommodations.component.html',
  styleUrl: './search-accommodations.component.css'
})
export class SearchAccommodationsComponent implements OnInit{

  userRole: string = '';
  accommodations: Accommodation[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private accommodationService: AccommodationService) {}

  ngOnInit(): void {
    this.accommodationService.getAccommodations().subscribe((data) => {
      this.accommodations = data;
    });
  }

  editApartment() {
    this.router.navigate(['/edit-apartment'])
  }
}
