import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationReviewComponentComponent } from './reservation-review-component.component';

describe('ReservationReviewComponentComponent', () => {
  let component: ReservationReviewComponentComponent;
  let fixture: ComponentFixture<ReservationReviewComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationReviewComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationReviewComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
