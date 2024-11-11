import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { AuthService } from '../../core/service/auth/auth.service';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userRole: string = '';
  isProfileMenuOpen: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userRole$.subscribe((role) => {
      this.userRole = role;
    });
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  closeMenu() {
    this.isProfileMenuOpen = false;  
  }

  logout(): void {
    this.authService.logout();
  }
}
