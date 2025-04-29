import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAccommodationsComponent } from './search-accommodations.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SearchAccommodationsComponent', () => {
  let component: SearchAccommodationsComponent;
  let fixture: ComponentFixture<SearchAccommodationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchAccommodationsComponent, HttpClientTestingModule]
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
