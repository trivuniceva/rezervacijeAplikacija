import { TestBed } from '@angular/core/testing';

import { CalendarService } from './calendar.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CalendarService', () => {
  let service: CalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
