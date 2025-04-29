import { TestBed } from '@angular/core/testing';

import { SpecialPriceServiceService } from './special-price-service.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SpecialPriceServiceService', () => {
  let service: SpecialPriceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SpecialPriceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
