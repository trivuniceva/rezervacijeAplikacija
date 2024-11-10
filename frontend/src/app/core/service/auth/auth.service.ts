import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, throwError} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/auth';

  private userRoleSubject = new BehaviorSubject<string>('');
  userRole$ = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient) { }

  getLoggedUser(){
    const user = localStorage.getItem('loggedUser');
    return user ? JSON.parse(user) : null;
  }
  login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl + '/login', { email, password });
  }

  storageHandle({ user }: { user: any }) {
    localStorage.setItem('loggedUser', JSON.stringify(user));
    this.userRoleSubject.next(user.userRole);
  }

  logout() {
    localStorage.removeItem('loggedUser');
    this.userRoleSubject.next('');
  }

  register(userData: any): Observable<any> {
    console.log(userData.email)
    console.log(userData.password)
    console.log(userData.role)

    return this.http.post<any>(`${this.apiUrl}/register`, userData).pipe(
      catchError(error => {
        console.error('Registration error:', error);
        return throwError(error);
      })
    );
  }

  updateUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update-user`, userData, { responseType: 'text' as 'json' }).pipe(
      catchError(error => {
        console.error('Error updating user:', error);
        return throwError(error);
      })
    );
  }

}
