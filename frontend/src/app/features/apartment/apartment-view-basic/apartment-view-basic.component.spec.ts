import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentViewBasicComponent } from './apartment-view-basic.component';

describe('ApartmentViewBasicComponent', () => {
  let component: ApartmentViewBasicComponent;
  let fixture: ComponentFixture<ApartmentViewBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApartmentViewBasicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApartmentViewBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
