import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../../../core/service/auth/auth.service';
import {CalendarComponent} from '../../calendar/calendar.component';
import {AccommodationService} from '../../../../core/service/accommodation/accommodation.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-reservation-dialog',
  standalone: true,
  imports: [
    FormsModule,
    CalendarComponent,
    NgIf,
  ],
  templateUrl: './reservation-dialog.component.html',
  styleUrl: './reservation-dialog.component.css'
})
export class ReservationDialogComponent implements OnInit{
  selectedDate: Date  | null = null;
  user: any;
  reservedDaysNum: number = 0;
  fullPrice: number = 0;


  accommodation: any;
  guestError: string = '';
  numGuests: any;

  constructor(
    public dialogRef: MatDialogRef<ReservationDialogComponent>, // Inject MatDialogRef
    @Inject(MAT_DIALOG_DATA) public data: { accommodation: any },
    private authService: AuthService,
    private accommodationService: AccommodationService,
  ) {
  }

  ngOnInit() {
    this.accommodation = history.state.accommodation;
    this.numGuests = this.accommodation.minGuests;


    this.user = this.authService.getLoggedUser()
    console.log(this.user)
    console.log("oko moje  <333333")

  }

  updateReservedDaysNum(selectedDates: Date[]) {
    this.reservedDaysNum = selectedDates.length;
  }

  updateFullPrice(price: number) {
    this.fullPrice = price;
  }

  confirmReservation() {
    const reservationData = {
      accommodationId: this.data.accommodation.id,
      userId: this.user.id,
      fullPrice: this.fullPrice,
      selectedDates: this.selectedDate,
      numberOfGuests: this.numGuests
    };

    console.log("heloooooo accccc")
    console.log(this.data.accommodation.id)
    console.log(this.data.accommodation)
    console.log(this.fullPrice)
    console.log(this.selectedDate)

    this.accommodationService.reserveAccommodation(reservationData).subscribe({
      next: (response) => {
        console.log('Rezervacija uspešno potvrđena:', response.message);  // Pristup poruci
      },
      error: (error) => {
        console.error('Došlo je do greške:', error);
      }
    });

  }

  closeDialog() {
    this.dialogRef.close();
  }


  validateGuests() {
    if (this.numGuests < this.data.accommodation.minGuests) {
      this.numGuests = this.data.accommodation.minGuests;
      this.guestError = `Minimum number of guests is ${this.data.accommodation.minGuests}.`;
    } else if (this.numGuests > this.data.accommodation.maxGuests) {
      this.numGuests = this.data.accommodation.maxGuests;
      this.guestError = `Maximum number of guests is ${this.data.accommodation.maxGuests}.`;
    } else {
      this.guestError = '';
    }
  }

  increaseGuests() {
    if (this.numGuests < this.data.accommodation.maxGuests) {
      this.numGuests++;
      this.validateGuests();
    }
  }

  decreaseGuests() {
    if (this.numGuests > this.data.accommodation.minGuests) {
      this.numGuests--;
      this.validateGuests();
    }
  }
}
