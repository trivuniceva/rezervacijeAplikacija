import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApartmentComponent } from './add-apartment.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AddApartmentComponent', () => {
  let component: AddApartmentComponent;
  let fixture: ComponentFixture<AddApartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddApartmentComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddApartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
