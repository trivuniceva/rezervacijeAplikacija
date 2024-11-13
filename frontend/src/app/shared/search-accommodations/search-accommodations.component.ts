import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {AuthService} from '../../core/service/auth/auth.service';
import {Router} from '@angular/router';

interface Item {
  imageUrl: string;
  title: string;
  description: string;
}


@Component({
  selector: 'app-search-accommodations',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './search-accommodations.component.html',
  styleUrl: './search-accommodations.component.css'
})
export class SearchAccommodationsComponent implements OnInit{

  items: Item[] = [];
  userRole: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {

    this.authService.userRole$.subscribe((role) => {
      this.userRole = role;
    });

    this.items = [
      { imageUrl: '/pics/apartment/a2.jpg', title: 'Adventure 1', description: 'Opis 1' },
      { imageUrl: '/pics/apartment/a3.jpg', title: 'Adventure 2', description: 'Opis 2' },
      { imageUrl: '/pics/apartment/a2.jpg', title: 'Adventure 3', description: 'Opis 3' },
    ];
  }

  editApartment() {
    this.router.navigate(['/edit-apartment'])
  }
}
