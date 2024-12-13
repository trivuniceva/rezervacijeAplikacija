import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialPricing } from './SpecialPricing';

describe('PricingAndAvailabilityComponent', () => {
  let component: SpecialPricing;
  let fixture: ComponentFixture<SpecialPricing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialPricing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialPricing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
