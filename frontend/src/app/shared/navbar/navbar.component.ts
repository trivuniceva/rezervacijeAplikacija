import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {AuthService} from '../../core/service/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userRole: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.userRole$.subscribe(role => {
      this.userRole = role;
    });
  }

  logout() {
    this.authService.logout();
  }
}
