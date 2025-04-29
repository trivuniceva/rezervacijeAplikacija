import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostCalendarComponent } from './host-calendar.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('HostCalendarComponent', () => {
  let component: HostCalendarComponent;
  let fixture: ComponentFixture<HostCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostCalendarComponent, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HostCalendarComponent);
    component = fixture.componentInstance;
    component.apartment = { id: 1, defaultPrice: 100, availabilityList: [] }; // Mock apartment
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
