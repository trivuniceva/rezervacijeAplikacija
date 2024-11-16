import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostInfoComponent } from './host-info.component';

describe('ApartmentInfoComponent', () => {
  let component: HostInfoComponent;
  let fixture: ComponentFixture<HostInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
