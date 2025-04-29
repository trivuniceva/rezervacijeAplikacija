import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../../../core/service/auth/auth.service';
import {AccommodationService} from '../../../../core/service/accommodation/accommodation.service';
import {NgIf} from '@angular/common';
import {PricingMethodFormatPipe} from '../../../../pipes/pricing-method-format.pipe';
import {CalendarComponent} from '../../../calendar/calendar/calendar.component';
import {GuestCalendarComponent} from '../../../calendar/pages/guest-calendar/guest-calendar.component';

@Component({
  selector: 'app-reservation-dialog',
  standalone: true,
  imports: [
    FormsModule,
    CalendarComponent,
    NgIf,
    PricingMethodFormatPipe,
    GuestCalendarComponent,
  ],
  templateUrl: './reservation-dialog.component.html',
  styleUrl: './reservation-dialog.component.css'
})
export class ReservationDialogComponent implements OnInit{
  selectedDate: Date[] = [];
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
  }

  updateReservedDaysNum(selectedDates: Date[]) {
    this.reservedDaysNum = selectedDates.length;
    this.selectedDate = selectedDates;
  }

  updateFullPrice(price: number) {
    this.fullPrice = price;
  }

  confirmReservation() {
    const formattedDates = this.selectedDate.map((date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Dodaje 0 ako je jednocifren broj
      const day = String(date.getDate()).padStart(2, '0'); // Dodaje 0 ako je jednocifren broj
      return `${year}-${month}-${day}`;
    });

    const reservationData = {
      accommodationId: this.data.accommodation.id,
      userId: this.user.id,
      fullPrice: this.fullPrice,
      selectedDates: formattedDates,
      numberOfGuests: this.numGuests
    };

    console.log("heloooooo accccc")
    console.log(this.data.accommodation.id)
    console.log(this.data.accommodation)
    console.log(this.fullPrice)
    console.log("evo")
    console.log(this.selectedDate)
    console.log("formatted dates:", formattedDates);

    this.accommodationService.reserveAccommodation(reservationData).subscribe({
      next: (response) => {
        console.log('Rezervacija uspešno potvrđena:', response.message);
        alert('Rezervacija uspešno potvrđena!');
        this.closeDialog();
      },
      error: (error) => {
        console.error('Došlo je do greške:', error);
        alert('Došlo je do greške pri rezervaciji. Pokušajte ponovo.');
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
