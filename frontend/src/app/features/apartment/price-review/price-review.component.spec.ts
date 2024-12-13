import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceReviewComponent } from './price-review.component';

describe('PriceReviewComponent', () => {
  let component: PriceReviewComponent;
  let fixture: ComponentFixture<PriceReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
