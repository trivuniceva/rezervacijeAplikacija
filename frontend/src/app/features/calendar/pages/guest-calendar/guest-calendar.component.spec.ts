import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestCalendarComponent } from './guest-calendar.component';

describe('HuestCalendarComponent', () => {
  let component: GuestCalendarComponent;
  let fixture: ComponentFixture<GuestCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
