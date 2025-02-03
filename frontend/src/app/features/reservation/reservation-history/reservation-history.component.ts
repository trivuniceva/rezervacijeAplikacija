import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SpecialPriceServiceService} from '../../../core/service/special_prices/special-price-service.service';
import {Observable} from 'rxjs';
import {Reservation, ReservationService} from '../../../core/service/reservation/reservation.service';
import {AuthService} from '../../../core/service/auth/auth.service';

@Component({
  selector: 'app-reservation-history',
  standalone: true,
  imports: [
    DatePipe,
    CurrencyPipe,
    NgForOf,
    NgIf,
    NgClass,
    FormsModule
  ],
  templateUrl: './reservation-history.component.html',
  styleUrl: './reservation-history.component.css'
})
export class ReservationHistoryComponent implements OnInit{
  rezervacije: Reservation[] = [];
  user: any;

  searchTerm: string = ''; // Pretraga po nazivu smeštaja
  searchDate: string = ''; // Pretraga po datumu
  filterStatus: string = ''; // Filtriranje po statusu

  constructor(private reservationService: ReservationService, private authService: AuthService,) { }

  ngOnInit() {
    this.user = this.authService.getLoggedUser()
    this.fetchReservations();
  }

  // Dohvatanje svih rezervacija sa backend-a
  fetchReservations() {
    this.reservationService.getReservationsForGuest(this.user.id).subscribe((data: Reservation[]) => {
      console.log(data);

      this.rezervacije = data.sort((a, b) => {
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();
        return dateB - dateA;
      });
    });
  }


  // Metoda za filtriranje rezervacija
  filtriraneRezervacije() {
    return this.rezervacije.filter(rezervacija => {
      let match = true;

      // Pretraga po nazivu smeštaja
      // if (this.searchTerm && !rezervacija.accommodationName.toLowerCase().includes(this.searchTerm.toLowerCase())) {
      //   match = false;
      // }

      // Pretraga po datumu
      if (this.searchDate && rezervacija.startDate !== this.searchDate) {
        match = false;
      }

      // Filtriranje po statusu
      if (this.filterStatus && rezervacija.status !== this.filterStatus.toUpperCase()) {
        match = false;
      }

      return match;
    });
  }

  // Metoda koja proverava da li je rezervacija prošla
  isPastReservation(date: string): boolean {
    const today = new Date();
    const reservationDate = new Date(date);
    return reservationDate < today;
  }

  // Metoda za odbijanje rezervacije
  odbijRezervaciju(rezervacija: any) {
    // Logika za odbijanje rezervacije
    alert(`Rezervacija za smeštaj ${rezervacija.accommodationName} je odbijena.`);
    // Možeš pozvati API da ažurira status rezervacije na 'rejected'
  }

  // Metoda za brisanje rezervacije
  obrisiRezervaciju(rezervacija: any) {
    // Logika za brisanje rezervacije
    const index = this.rezervacije.indexOf(rezervacija);
    if (index !== -1) {
      this.rezervacije.splice(index, 1);
      alert(`Rezervacija za smeštaj ${rezervacija.accommodationName} je obrisana.`);
      // Možeš pozvati API da ukloni rezervaciju sa backend-a
    }
  }


}
