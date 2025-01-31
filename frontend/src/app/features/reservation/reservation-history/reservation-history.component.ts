import { Component } from '@angular/core';
import {CurrencyPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'app-reservation-history',
  standalone: true,
  imports: [
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './reservation-history.component.html',
  styleUrl: './reservation-history.component.css'
})
export class ReservationHistoryComponent {
}
