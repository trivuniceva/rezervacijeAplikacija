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

      this.rezervacije.forEach(reservation => {
        console.log("Rezervacija id: " + reservation.guest.id);
        this.reservationService.fetchGuestDeclinedCount(reservation.guest.id).subscribe(
          (declinedCount: number) => {
            console.log('Broj odbijenih rezervacija: ' + declinedCount);
            reservation.declinedCount = declinedCount;
          },
          error => console.error('Greška pri slanju zahteva', error)
        );
      });
    });
  }

  updateReservation(reservationId: number, action: string): void {
    const status = action === 'approve' ? 'APPROVED' : 'REJECTED';

    this.reservationService.updateReservationStatus(reservationId, status).subscribe(response => {
      console.log(`Rezervacija ${status === 'APPROVED' ? 'odobrena' : 'odbijena'}`, response);

      const updatedReservation = this.rezervacije.find(reservation => reservation.id === reservationId);
      if (updatedReservation) {
        updatedReservation.status = status === 'APPROVED' ? 'ACCEPTED' : 'REJECTED';

        this.rezervacije = this.rezervacije.filter(reservation => {
          const startDate = new Date(updatedReservation.startDate);
          const endDate = new Date(updatedReservation.endDate);

          const isOverlapping = new Date(reservation.startDate) <= endDate && new Date(reservation.endDate) >= startDate;

          return !(isOverlapping && reservation.id !== updatedReservation.id);
        });

        if (updatedReservation.status === 'ACCEPTED') {
          setTimeout(() => {
            this.rezervacije = this.rezervacije.filter(reservation => reservation.id !== updatedReservation.id);
          }, 1000);
        }
      }
    }, error => {
      console.error('Greška pri ažuriranju', error);
    });
  }

}
