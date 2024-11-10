import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  private userRoleSubject = new BehaviorSubject<string>('');
  userRole$ = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient) { }

  getLoggedUser(){
    const user = localStorage.getItem('loggedUser');
    return user ? JSON.parse(user) : null;
  }

  getUserRole() {
    let user = localStorage.getItem('loggedUser');

    if (user) {
      let parsedUser = JSON.parse(user);
      return parsedUser.userRole;
    }

    return null;
  }


  login(email: string, password: string): Observable<any> {
    console.log("uso u log")

    console.log("uso u logiiii")

    return this.http.post(this.apiUrl + '/login', { email, password });
  }

  logout() {
    localStorage.removeItem('loggedUser');
    this.userRoleSubject.next('');
  }

}
