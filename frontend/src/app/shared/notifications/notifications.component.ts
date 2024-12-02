import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../core/service/notification/notification.service';
import { AppNotification } from '../../core/service/notification/notification.service';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import {AuthService} from '../../core/service/auth/auth.service';
import {
  ApartmentDetailsComponent
} from '../../features/apartment/apartment-view/apartment-details/apartment-details.component';
import {EditApartmentComponent} from '../../features/apartment/edit-apartment/edit-apartment.component';
import {AccommodationService} from '../../core/service/accommodation/accommodation.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [NgForOf, NgIf, CommonModule, ApartmentDetailsComponent, EditApartmentComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent implements OnInit {
  notifications: AppNotification[] = [];
  user: any;
  userRole: string = '';
  selectedNotification: any = null;

  constructor(private notificationService: NotificationService, private authService: AuthService, private accomodationService: AccommodationService) {}

  ngOnInit() {
    this.user = this.authService.getLoggedUser();

    this.authService.userRole$.subscribe((role) => {
      this.userRole = role;
    });

    this.notificationService.getNotifications(this.user.id).subscribe((data) => {
      this.notifications = data;
    });
  }

  markAsRead(id: number) {
    this.notificationService.markAsRead(id).subscribe(() => {
      this.notifications = this.notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      );
    });
  }


  loading: boolean = false;

  toggleDetails(notification: any) {
    if (this.selectedNotification === notification) {
      this.selectedNotification = null;
    } else {
      this.selectedNotification = notification;
      const apartmentId = this.selectedNotification.info;
      this.loading = true;

      this.accomodationService.getAccommodationById(apartmentId).subscribe(
        (apartment) => {
          this.loading = false;
          this.selectedNotification.apartment = apartment;
        },
        (error) => {
          this.loading = false;
          console.error("Error fetching apartment details:", error);
        }
      );
    }
  }




}
