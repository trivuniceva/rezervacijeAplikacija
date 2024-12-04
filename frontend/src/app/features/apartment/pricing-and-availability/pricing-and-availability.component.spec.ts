import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingAndAvailabilityComponent } from './pricing-and-availability.component';

describe('PricingAndAvailabilityComponent', () => {
  let component: PricingAndAvailabilityComponent;
  let fixture: ComponentFixture<PricingAndAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingAndAvailabilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricingAndAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
