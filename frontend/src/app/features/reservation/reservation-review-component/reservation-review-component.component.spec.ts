import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationReviewComponentComponent } from './reservation-review-component.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReservationService } from '../../../core/service/reservation/reservation.service';
import { of } from 'rxjs';

class MockReservationService {
  getReservationsForHost(id: number) {
    return of([]);
  }

  fetchGuestDeclinedCount(id: number) {
    return of(0);
  }

  updateReservationStatus(id: number, status: string) {
    return of({});
  }
}

describe('ReservationReviewComponentComponent', () => {
  let component: ReservationReviewComponentComponent;
  let fixture: ComponentFixture<ReservationReviewComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationReviewComponentComponent, HttpClientTestingModule],
      providers: [
        { provide: ReservationService, useClass: MockReservationService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationReviewComponentComponent);
    component = fixture.componentInstance;

    component.apartment = { id: 1 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
