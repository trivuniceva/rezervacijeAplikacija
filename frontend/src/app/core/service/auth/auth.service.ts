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

  getUserRole(){
    return this.userRoleSubject.getValue();
  }

  login(email: string, password: string): Observable<any> {
    console.log("uso u logiiii na servisu ")

    return this.http.post(this.apiUrl + '/login', { email, password });
  }

  storageHandle({ user }: { user: any }) {
    localStorage.setItem('loggedUser', JSON.stringify(user));

    // Emit the user's role when it's stored
    this.userRoleSubject.next(user.userRole);

    console.log("User role emitted:", user.userRole);
    console.log(localStorage.getItem('loggedUser'));
    console.log(user.email);
    console.log(user.phone);
    console.log(user.profilePic);
  }


  logout() {
    localStorage.removeItem('loggedUser');
    this.userRoleSubject.next('');
  }

}
