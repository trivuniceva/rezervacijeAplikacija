import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationDialogComponent } from './reservation-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../../core/service/auth/auth.service';
import { AccommodationService } from '../../../../core/service/accommodation/accommodation.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('ReservationDialogComponent', () => {
  let component: ReservationDialogComponent;
  let fixture: ComponentFixture<ReservationDialogComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy()
  };
  const mockDialogData = {
    accommodation: {
      id: 1,
      minGuests: 1,
      maxGuests: 2
    }
  };
  const mockAuthService = {
    getLoggedUser: jasmine.createSpy().and.returnValue({ id: 1, firstname: 'Test', lastname: 'User', email: 'test@example.com', address: 'Test Address', phone: '123-456-7890' })
  };
  const mockAccommodationService = {
    reserveAccommodation: jasmine.createSpy().and.returnValue(of({ message: 'Reservation successful' }))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReservationDialogComponent,
        HttpClientTestingModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: AuthService, useValue: mockAuthService },
        { provide: AccommodationService, useValue: mockAccommodationService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReservationDialogComponent);
    component = fixture.componentInstance;
    history.pushState({ accommodation: mockDialogData.accommodation }, '');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog when closeDialog is called', () => {
    component.closeDialog();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

});
