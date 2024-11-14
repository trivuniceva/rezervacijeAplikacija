import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAccommodationsComponent } from './search-accommodations.component';

describe('SearchAccommodationsComponent', () => {
  let component: SearchAccommodationsComponent;
  let fixture: ComponentFixture<SearchAccommodationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchAccommodationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchAccommodationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
