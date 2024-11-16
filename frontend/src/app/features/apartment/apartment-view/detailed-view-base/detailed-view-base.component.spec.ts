import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedViewBaseComponent } from './detailed-view-base.component';

describe('DetailedViewComponent', () => {
  let component: DetailedViewBaseComponent;
  let fixture: ComponentFixture<DetailedViewBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedViewBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedViewBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
