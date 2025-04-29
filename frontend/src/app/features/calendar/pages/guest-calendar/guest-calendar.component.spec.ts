import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestCalendarComponent } from './guest-calendar.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';

describe('GuestCalendarComponent', () => {
  let component: GuestCalendarComponent;
  let fixture: ComponentFixture<GuestCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestCalendarComponent, HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestCalendarComponent);
    component = fixture.componentInstance;

    component.apartment = {
      id: 1,
      defaultPrice: 100,
      availabilityList: []
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
