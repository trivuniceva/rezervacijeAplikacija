import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SpecialPriceServiceService} from '../../../core/service/special_prices/special-price-service.service';
import {Observable} from 'rxjs';

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
export class ReservationHistoryComponent {

  rezervacije = [
    { nazivSmestaja: 'Hotel Beograd', datum: new Date(2024, 7, 15), status: 'accepted' },
    { nazivSmestaja: 'Apartman Novi Sad', datum: new Date(2024, 8, 10), status: 'rejected' },
    { nazivSmestaja: 'Vikendica Tara', datum: new Date(2024, 5, 20), status: 'accepted' },
    { nazivSmestaja: 'Motel Subotica', datum: new Date(2024, 9, 5), status: 'pending' }
  ];

  searchTerm: string = '';
  searchDate: string = '';
  filterStatus: string = '';


  isPastReservation(datum: Date): boolean {
    return datum.getTime() < new Date().getTime();
  }


  filtriraneRezervacije() {
    return this.rezervacije.filter(rezervacija => {
      const matchesSearch = (rezervacija.nazivSmestaja || '').toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesDate = this.searchDate ? new Date(rezervacija.datum).toISOString().split('T')[0] === this.searchDate : true;
      const matchesStatus = this.filterStatus ? rezervacija.status === this.filterStatus : true;
      return matchesSearch && matchesDate && matchesStatus;
    });
  }


  odbijRezervaciju(rezervacija: any) {
    console.log('Odbijanje rezervacije:', rezervacija);
  }

  obrisiRezervaciju(rezervacija: any) {
    console.log('Brisanje rezervacije:', rezervacija);
  }

}
