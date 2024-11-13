import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';

interface Item {
  imageUrl: string;
  title: string;
  description: string;
}


@Component({
  selector: 'app-search-accommodations',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './search-accommodations.component.html',
  styleUrl: './search-accommodations.component.css'
})
export class SearchAccommodationsComponent implements OnInit{

  items: Item[] = [];

  ngOnInit(): void {
    this.items = [
      { imageUrl: 'path/to/image1.jpg', title: 'Adventure 1', description: 'Opis 1' },
      { imageUrl: 'path/to/image2.jpg', title: 'Adventure 2', description: 'Opis 2' },
      { imageUrl: 'path/to/image3.jpg', title: 'Adventure 3', description: 'Opis 3' },
    ];
  }

}
