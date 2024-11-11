import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient, private authService: AuthService) { }

  updateUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update-user`, userData, { responseType: 'text' as 'json' }).pipe(
      catchError(error => {
        console.error('Error updating user:', error);
        return throwError(error);
      })
    );
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    // console.log(this.authService.getLoggedUser())

    const payload = {
      oldPassword: oldPassword,
      newPassword: newPassword
    };

    return this.http.post(`${this.apiUrl}/change-password`, payload);
  }



}
