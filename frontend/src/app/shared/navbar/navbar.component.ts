import { Component, OnInit } from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import { AuthService } from '../../core/service/auth/auth.service';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgIf,
    RouterModule,
    NgClass
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit {
  userRole: string = '';
  isProfileMenuOpen: boolean = false;
  isReservationMenuOpen: boolean = false;
  isApartmentMenuOpen: boolean = false;
  isSearchActive: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userRole$.subscribe((role) => {
      this.userRole = role;
    });
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
    if (this.isProfileMenuOpen) {
      this.isReservationMenuOpen = false; // Zatvori Reservation meni ako se otvara Profile meni
    }
  }

  toggleReservationMenu() {
    this.isReservationMenuOpen = !this.isReservationMenuOpen;
    if (this.isReservationMenuOpen) {
      this.isProfileMenuOpen = false; // Zatvori Profile meni ako se otvara Reservation meni
    }
  }

  toggleApartmentMenu() {
    this.isApartmentMenuOpen = !this.isApartmentMenuOpen;
    this.isProfileMenuOpen = false; // Zatvara drugi meni ako je otvoren
  }

  closeMenus() {
    this.isProfileMenuOpen = false;
    this.isReservationMenuOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.closeMenus();
  }

  setActivePage(page: string) {
    this.isSearchActive = page === '/search-apartment';
  }
}


