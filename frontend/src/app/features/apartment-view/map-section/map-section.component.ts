import {Component, Input, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';

@Component({
  selector: 'app-map-section',
  standalone: true,
  imports: [
    LeafletModule
  ],
  templateUrl: './map-section.component.html',
  styleUrl: './map-section.component.css'
})
export class MapSectionComponent implements OnInit{
  @Input() layers: L.Layer[] = [];
  options: any;
  map?: L.Map;

  ngOnInit(): void {
    this.options = this.getMapOptions();
  }

  private getMapOptions() {
    return {
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap'
        })
      ],
      zoom: 13,
      center: L.latLng(45.2671, 19.8335)
    };
  }
}
