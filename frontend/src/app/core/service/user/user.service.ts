import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient) { }


  updateUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update-user`, userData, { responseType: 'text' as 'json' }).pipe(
      catchError(error => {
        console.error('Error updating user:', error);
        return throwError(error);
      })
    );
  }

  uploadProfilePic(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/upload-profile-pic`, formData).pipe(
      catchError(error => {
        console.error('Error uploading profile picture:', error);
        return throwError(error);
      })
    );
  }


}
