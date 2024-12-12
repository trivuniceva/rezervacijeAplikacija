import { Component, OnInit } from '@angular/core';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';

interface SpecialPrice {
  id: number;
  accommodation_id: number;
  start_date: string;
  end_date: string;
  price: number;
  availability: 'AVAILABLE' | 'NOT_AVAILABLE';
}

@Component({
  selector: 'app-price-review',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    CurrencyPipe,
  ],
  templateUrl: './price-review.component.html',
  styleUrls: ['./price-review.component.css']
})
export class PriceReviewComponent implements OnInit {
  specialPrices: SpecialPrice[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor() { }

  ngOnInit(): void {
    this.specialPrices = [
      {
        id: 1,
        accommodation_id: 101,
        start_date: '2024-12-01',
        end_date: '2024-12-10',
        price: 120.50,
        availability: 'AVAILABLE'
      },
      {
        id: 2,
        accommodation_id: 102,
        start_date: '2024-12-05',
        end_date: '2024-12-15',
        price: 95.75,
        availability: 'NOT_AVAILABLE'
      },
      {
        id: 3,
        accommodation_id: 103,
        start_date: '2024-12-10',
        end_date: '2024-12-20',
        price: 150.00,
        availability: 'AVAILABLE'
      },
      {
        id: 4,
        accommodation_id: 104,
        start_date: '2024-12-01',
        end_date: '2024-12-05',
        price: 110.00,
        availability: 'NOT_AVAILABLE'
      }
    ];
  }
}
