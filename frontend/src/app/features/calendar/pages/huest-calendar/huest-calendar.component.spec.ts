import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuestCalendarComponent } from './huest-calendar.component';

describe('HuestCalendarComponent', () => {
  let component: HuestCalendarComponent;
  let fixture: ComponentFixture<HuestCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HuestCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuestCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
