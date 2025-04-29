import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationHistoryComponent } from './reservation-history.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ReservationHistoryComponent', () => {
  let component: ReservationHistoryComponent;
  let fixture: ComponentFixture<ReservationHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationHistoryComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
