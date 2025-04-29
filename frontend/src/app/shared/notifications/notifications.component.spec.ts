import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsComponent } from './notifications.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {AuthService} from '../../core/service/auth/auth.service';
import {NotificationService} from '../../core/service/notification/notification.service';
import {AccommodationService} from '../../core/service/accommodation/accommodation.service';

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;

  const mockAuthService = {
    getLoggedUser: () => ({ id: 1 }),
    userRole$: of('ADMINISTRATOR')
  };

  const mockNotificationService = {
    getNotifications: () => of([]),
    approveApartment: () => of({}),
    rejectApartment: () => of({})
  };

  const mockAccommodationService = {
    getAccommodationById: () => of({})
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsComponent, HttpClientTestingModule],

      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: AccommodationService, useValue: mockAccommodationService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
