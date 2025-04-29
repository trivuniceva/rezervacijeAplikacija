import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialPricing } from './SpecialPricing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {DatePipe} from '@angular/common';
import {SpecialPriceServiceService} from '../../../core/service/special_prices/special-price-service.service';

describe('PricingAndAvailabilityComponent', () => {
  let component: SpecialPricing;
  let fixture: ComponentFixture<SpecialPricing>;

  const mockSpecialPriceService = {
    createSpecialPrice: () => of({ message: 'Success' }),
    getReservedDatesByApartmentId: () => of([]),
    getUnavailableDates: () => of([]),
    getSpecialPricesByApartmentId: () => of([]),
    getSpecialPricesByAccommodationId: () => of([])
  };



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialPricing, HttpClientTestingModule],
      providers: [
        DatePipe,
        { provide: SpecialPriceServiceService, useValue: mockSpecialPriceService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialPricing);
    component = fixture.componentInstance;
    component.apartment = {
      id: 1,
      deadline: '2025-05-01',
      defaultPrice: 100,
      pricingMethod: 'Daily'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
