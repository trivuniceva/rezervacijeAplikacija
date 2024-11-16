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
export class MapSectionComponent implements OnInit {
  private map: L.Map | undefined;

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [45.2671, 19.8335], // Koordinate za Novi Sad
      zoom: 13, // Nivo zumiranja
      zoomControl: false, // Onemogućava dugmiće za zumiranje
      dragging: false, // Onemogućava pomeranje mape
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }
}
