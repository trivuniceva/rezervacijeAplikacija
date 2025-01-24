import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../../../core/service/auth/auth.service';
import {CalendarComponent} from '../../calendar/calendar.component';

@Component({
  selector: 'app-reservation-dialog',
  standalone: true,
  imports: [
    FormsModule,
    CalendarComponent,
  ],
  templateUrl: './reservation-dialog.component.html',
  styleUrl: './reservation-dialog.component.css'
})
export class ReservationDialogComponent implements OnInit{
  selectedDate: Date  | null = null;
  user: any;
  reservedDaysNum: number = 0;

  constructor(
    public dialogRef: MatDialogRef<ReservationDialogComponent>, // Inject MatDialogRef
    @Inject(MAT_DIALOG_DATA) public data: { accommodation: any },
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.user = this.authService.getLoggedUser()
    console.log(this.user)
    console.log("oko moje  <333333")

  }

  updateReservedDaysNum(count: number) {
    this.reservedDaysNum = count;
    console.log(`Broj rezervisanih dana: ${this.reservedDaysNum}`);
  }

  confirmReservation() {
    const reservationData = {
      accommodationId: this.data.accommodation.id,
      userId: this.user.id,
      startDate: this.selectedDate
    };

    console.log("heloooooo accccc")
    console.log(this.data.accommodation.id)
    console.log(this.data.accommodation)


    this.dialogRef.close(reservationData);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
