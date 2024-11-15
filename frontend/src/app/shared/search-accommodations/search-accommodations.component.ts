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
    this.authService.userRole$.subscribe((role) => {
      this.userRole = role;
    });

    if(this.userRole === '' || this.userRole === 'GUEST'){
      this.accommodationService.getAccommodations().subscribe((data) => {
        this.accommodations = data;
        console.log(this.accommodations)
      });
    }
    else {
      console.log("sto si slatka <333333333")
      console.log(this.userRole)
      console.log(this.authService.getLoggedUser())
      console.log(this.authService.getLoggedUser().email)

      this.accommodationService.findAccommodationsByHost(this.authService.getLoggedUser().email).subscribe((data) => {
        this.accommodations = data;
        console.log("hajmo lutko <333333333")
        console.log(this.authService.getLoggedUser())
        console.log(this.authService.getLoggedUser().email)
        console.log(this.accommodations)
      });
    }

  }

  editApartment() {
    this.router.navigate(['/edit-apartment'])
  }

  detailedViewApartment() {
    this.router.navigate(['/detailed-view'])
  }

  signup() {
    this.router.navigate(['/login'])
  }
}
