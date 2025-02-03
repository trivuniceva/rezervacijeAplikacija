import {Component, Input, OnInit} from '@angular/core';
import {Reservation, ReservationService} from '../../../core/service/reservation/reservation.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-reservation-review-component',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './reservation-review-component.component.html',
  styleUrl: './reservation-review-component.component.css'
})
export class ReservationReviewComponentComponent implements OnInit{
  @Input() apartment: any;
  rezervacije: Reservation[] = [];

  constructor(private reservationService: ReservationService) {
  }

  ngOnInit() {
    this.fetchReservations();
  }

  fetchReservations() {
    this.reservationService.getReservationsForHost(this.apartment.id).subscribe((data: Reservation[]) => {
      console.log("deeeeeeeee ste beogradjaniiiii")
      console.log(data);

      this.rezervacije = data.sort((a, b) => {
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();
        return dateB - dateA;
      });
    });
  }

  approveReservation(rezervacija: Reservation) {
    console.log(`Odobrena rezervacija ID: ${rezervacija.id}`);
    rezervacija.status = 'APPROVED';
  }

  rejectReservation(rezervacija: Reservation) {
    console.log(`Odbijena rezervacija ID: ${rezervacija.id}`);
    rezervacija.status = 'REJECTED';
  }


}
