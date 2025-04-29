import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ApartmentImagesComponent} from '../apartment-images/apartment-images.component';
import {ApartmentDetailsComponent} from '../apartment-details/apartment-details.component';
import {HostInfoComponent} from '../host-info/host-info.component';
import {MapSectionComponent} from '../map-section/map-section.component';
import {AmenitiesInfoComponent} from '../amenities-info/amenities-info.component';
import { Location } from '@angular/common';
import {ReservationDialogComponent} from '../reservation-dialog/reservation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../../../core/service/auth/auth.service';

@Component({
  selector: 'app-detailed-view',
  standalone: true,
  imports: [
    ApartmentImagesComponent,
    ApartmentDetailsComponent,
    HostInfoComponent,
    MapSectionComponent,
    AmenitiesInfoComponent,
    NgIf,
  ],
  templateUrl: './detailed-view-base.component.html',
  styleUrl: './detailed-view-base.component.css'
})
export class DetailedViewBaseComponent implements OnInit {
  accommodation: any;
  user: any;
  userRole: string = '';

  constructor(private location: Location, public dialog: MatDialog, private authService: AuthService) {}

  ngOnInit(): void {
    this.accommodation = history.state.accommodation;

    if (!this.accommodation) {
      console.error('Accommodation data is missing in history state!');
    } else {
      console.log('Accommodation data:', this.accommodation);
    }

    this.authService.userRole$.subscribe((role) => {
      this.userRole = role;
    });
  }

  goBack() {
    this.location.back();
  }

  reserve() {
    const dialogRef = this.dialog.open(ReservationDialogComponent, {
      width: '800px',
      data: {
        accommodation: this.accommodation,
        user: this.user
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Reservation confirmed:', result);
      }
    });
  }
}
