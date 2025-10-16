import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ApartmentDetailsComponent} from './apartment-details.component';
import {RouterTestingModule} from '@angular/router/testing';
import {PricingMethodFormatPipe} from "../../../../pipes/pricing-method-format.pipe";

describe('ApartmentDetailsComponent', () => {
  let component: ApartmentDetailsComponent;
  let fixture: ComponentFixture<ApartmentDetailsComponent>;

  beforeEach(async () => {
    history.pushState({
      accommodation: {
        id: '123',
        name: 'Test Apartment',
        pricingMethod: 'PER_PERSON',
        description: 'A beautiful test apartment.',
        details: 'Some details.'
      }
    }, '');

    await TestBed.configureTestingModule({
      imports: [ApartmentDetailsComponent, RouterTestingModule],
      providers: [
        PricingMethodFormatPipe
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ApartmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load accommodation data from history.state on init', () => {
    expect(component.accommodation).toBeDefined();
    expect(component.accommodation.name).toBe('Test Apartment');
  });

  it('should show details and hide description', () => {
    component.showDetails();
    expect(component.displayDetails).toBe(true);
    expect(component.displayDescription).toBe(false);
  });

  it('should show description and hide details', () => {
    component.showDescription();
    expect(component.displayDescription).toBe(true);
    expect(component.displayDetails).toBe(false);
  });
});
