import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) { }


  updateUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update-user`, userData, { responseType: 'text' as 'json' }).pipe(
      catchError(error => {
        console.error('Error updating user:', error);
        return throwError(error);
      })
    );
  }

  changePassword(email: string, oldPassword: string, newPassword: string): Observable<any> {
    const payload = {
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword
    };

    return this.http.post<{ message: string }>(`${this.apiUrl}/change-password`, payload);
  }

}
