import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DetailedViewBaseComponent} from './detailed-view-base.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthService} from '../../../../core/service/auth/auth.service';
import {of} from 'rxjs';
import {Location} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {ReservationDialogComponent} from '../reservation-dialog/reservation-dialog.component';

describe('DetailedViewComponent', () => {
  let component: DetailedViewBaseComponent;
  let fixture: ComponentFixture<DetailedViewBaseComponent>;
  let authServiceMock: Partial<AuthService>;
  let locationMock: Partial<Location>;
  let dialogMock: Partial<MatDialog>;

  beforeEach(async () => {
    history.pushState({
      accommodation: {
        id: '1',
        name: 'Test Apartment',
        description: 'Test description',
        images: [],
        details: {},
        amenities: [],
        hostInfo: {}
      }
    }, '');

    authServiceMock = {
      userRole$: of('REGISTERED_USER')
    };

    locationMock = {
      back: jasmine.createSpy('back')
    };

    dialogMock = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of(true)
      })
    };

    await TestBed.configureTestingModule({
      imports: [DetailedViewBaseComponent, HttpClientTestingModule],
      providers: [
        {provide: AuthService, useValue: authServiceMock},
        {provide: Location, useValue: locationMock},
        {provide: MatDialog, useValue: dialogMock},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailedViewBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('treba da učita podatke o smeštaju iz history.state', () => {
    expect(component.accommodation).toBeDefined();
    expect(component.accommodation.name).toBe('Test Apartment');
  });

  it('treba da se pretplati na userRole$ i dobije ulogu', () => {
    expect(component.userRole).toBe('REGISTERED_USER');
  });

  it('treba da pozove location.back() kada se pozove goBack()', () => {
    component.goBack();
    expect(locationMock.back).toHaveBeenCalled();
  });

  it('treba da otvori dijalog za rezervaciju kada se pozove reserve()', () => {
    component.reserve();
    expect(dialogMock.open).toHaveBeenCalledWith(ReservationDialogComponent, jasmine.any(Object));
  });

});
