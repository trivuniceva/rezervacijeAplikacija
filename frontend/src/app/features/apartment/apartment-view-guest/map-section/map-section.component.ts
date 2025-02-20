import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@Component({
  selector: 'app-map-section',
  standalone: true,
  imports: [
    LeafletModule
  ],
  templateUrl: './map-section.component.html',
  styleUrl: './map-section.component.css'
})
export class MapSectionComponent implements OnInit, AfterViewInit {
  @Input() apartment: any;

  private map: L.Map | undefined;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    if (this.map) {
      this.map.remove();
    }
    this.map = L.map('map', {
      center: [45.2671, 19.8335],
      zoom: 13,
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    if (this.apartment && this.apartment.location) {
      this.geocodeAddress(this.apartment.location);
      console.log(this.apartment.location)
    }
  }

  private geocodeAddress(address: string): void {
    // Using OpenStreetMap Nominatim API for geocoding
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const latitude = parseFloat(data[0].lat);
          const longitude = parseFloat(data[0].lon);

          if (this.map) {
            this.map.setView([latitude, longitude], 15);

            const icon = L.icon({
              iconUrl: 'icon/location.png',
              iconSize: [35, 40],
            });

            L.marker([latitude, longitude], { icon: icon }).addTo(this.map)
              .bindPopup(this.apartment.name || 'Apartment Location')
              .openPopup();
          }
        } else {
          console.error('Address not found:', address);
          if (this.map) {
            L.popup()
              .setLatLng(this.map.getCenter())
              .setContent('Address not found')
              .openOn(this.map);
          }
        }
      })
      .catch(error => {
        console.error('Error geocoding address:', error);
        if (this.map) {
          L.popup()
            .setLatLng(this.map.getCenter())
            .setContent('Error finding the address')
            .openOn(this.map);
        }
      });
  }
}
