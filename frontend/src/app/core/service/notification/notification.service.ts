import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AppNotification {
  id: number;
  message: string;
  read: boolean;
  timestamp: string;
}

@Injectable({
  providedIn: 'root',
})

export class NotificationService {
  private apiUrl = 'http://localhost:8080/api/notifications';

  constructor(private http: HttpClient) {}

  getNotifications(userId: number): Observable<AppNotification[]> {
    return this.http.get<AppNotification[]>(`${this.apiUrl}?userId=${userId}`);
  }


  createNotification(notification: Partial<AppNotification>): Observable<AppNotification> {
    return this.http.post<AppNotification>(this.apiUrl, notification);
  }

  markAsRead(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/read`, {});
  }
}
