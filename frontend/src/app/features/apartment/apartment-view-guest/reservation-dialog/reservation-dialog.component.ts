import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../../../core/service/auth/auth.service';

@Component({
  selector: 'app-reservation-dialog',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './reservation-dialog.component.html',
  styleUrl: './reservation-dialog.component.css'
})
export class ReservationDialogComponent implements OnInit{
  selectedDate: Date  | null = null;
  user: any;

  constructor(
    public dialogRef: MatDialogRef<ReservationDialogComponent>, // Inject MatDialogRef
    @Inject(MAT_DIALOG_DATA) public data: { accommodation: any, user: any },
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.user = this.authService.getLoggedUser()
    console.log(this.user)
    console.log("oko moje  <333333")
  }

  onDateSelected(event: any) {
    this.selectedDate = event.value;
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
