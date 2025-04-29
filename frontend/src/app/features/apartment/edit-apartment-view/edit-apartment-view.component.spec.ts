import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  EditApartmentViewComponent } from './edit-apartment-view.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthService} from '../../../core/service/auth/auth.service';

describe('EditApartmentViewComponent', () => {
  let component: EditApartmentViewComponent;
  let fixture: ComponentFixture<EditApartmentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditApartmentViewComponent, HttpClientTestingModule],
      providers: [AuthService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditApartmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
