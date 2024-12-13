import {Component, Input, OnInit} from '@angular/core';
import { NgForOf, NgIf, CurrencyPipe } from '@angular/common';
import {
  SpecialPrice,
  SpecialPriceServiceService
} from '../../../core/service/special_prices/special-price-service.service';

@Component({
  selector: 'app-price-review',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    CurrencyPipe
  ],
  templateUrl: './price-review.component.html',
  styleUrls: ['./price-review.component.css']
})
export class PriceReviewComponent implements OnInit {
  @Input() apartment: any;
  specialPrices: SpecialPrice[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(private specialPriceService: SpecialPriceServiceService) { }

  ngOnInit(): void {
    console.log(this.apartment)
    this.fetchSpecialPrices(this.apartment.id);
  }

  fetchSpecialPrices(apartmentId: number): void {
    this.loading = true;
    this.error = null;

    this.specialPriceService.getAvailableSpecialPrices(apartmentId).subscribe({
      next: (prices) => {
        this.specialPrices = prices;
        console.log(this.specialPrices)
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Greška prilikom dohvatanja dostupnih cena.';
        this.loading = false;
      }
    });
  }


}
