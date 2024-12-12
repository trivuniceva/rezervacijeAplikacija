import { TestBed } from '@angular/core/testing';

import { SpecialPriceServiceService } from './special-price-service.service';

describe('SpecialPriceServiceService', () => {
  let service: SpecialPriceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialPriceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
