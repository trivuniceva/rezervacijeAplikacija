import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-apartment-view-basic',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './apartment-view-basic.component.html',
  styleUrl: './apartment-view-basic.component.css'
})

export class ApartmentViewBasicComponent {
  @Input() apartment: any;

}
