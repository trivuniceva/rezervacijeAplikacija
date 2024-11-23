import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../core/service/notification/notification.service';
import { AppNotification } from '../../core/service/notification/notification.service';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import {AuthService} from '../../core/service/auth/auth.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [NgForOf, NgIf, CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent implements OnInit {
  notifications: AppNotification[] = [];
  user: any;

  constructor(private notificationService: NotificationService, private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getLoggedUser();

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
}
