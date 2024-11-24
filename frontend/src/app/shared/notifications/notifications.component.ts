import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../core/service/notification/notification.service';
import { AppNotification } from '../../core/service/notification/notification.service';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import {AuthService} from '../../core/service/auth/auth.service';
import {
  ApartmentDetailsComponent
} from '../../features/apartment/apartment-view/apartment-details/apartment-details.component';
import {EditApartmentComponent} from '../../features/apartment/edit-apartment/edit-apartment.component';

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

  constructor(private notificationService: NotificationService, private authService: AuthService) {}

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

  toggleDetails(notification: any) {
    if (this.selectedNotification === notification) {
      // Ako je isto obaveštenje, zatvori detalje
      this.selectedNotification = null;
      console.log("1")
      console.log(this.selectedNotification)
    } else {
      // Inače prikaži detalje
      this.selectedNotification = notification;
      console.log("2")
      console.log(this.selectedNotification)
    }
  }

}
