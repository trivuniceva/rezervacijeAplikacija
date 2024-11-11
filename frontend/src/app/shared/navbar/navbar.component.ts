import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { AuthService } from '../../core/service/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf],
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
    console.log('Toggling profile menu');
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
    console.log('Profile menu state: ', this.isProfileMenuOpen);
  }


  logout(): void {
    this.authService.logout();
  }
}
