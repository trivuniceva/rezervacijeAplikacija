import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./shared/navbar/navbar.component";
import {NgIf} from '@angular/common';
import {AuthService} from './core/service/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'frontend';
  userRole: string = '';


  ngOnInit(): void {
    this.setUserRole();
  }

  setUserRole() {
    let user = localStorage.getItem('loggedUser');

    if (user) {
      let parsedUser = JSON.parse(user);
      this.userRole = parsedUser.userRole;
    } else {
      this.userRole = '';
    }
  }
}
