import { Component, OnInit, Input, ViewChild, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

declare var mapboxgl: any;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit, OnChanges {
  @Input() coords: string;
  @Input() draggable = false;
  @Input() interactive = true;
  @Input() zoom = 13;

  @ViewChild('mapa', { static: true }) mapa;
  @Output() coordenadasSeleccionada = new EventEmitter<string>();

  marker: any;
  map: any;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.marker) {
      const latLng = this.coords.split(',');
      const lat = Number(latLng[0]);
      const lng = Number(latLng[1]);
      this.marker.setLngLat([lng, lat])
        .addTo(this.map);
      this.map.setCenter([lng, lat]);
    }
  }

  ngOnInit() {
    
    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);

    mapboxgl.accessToken = 'pk.eyJ1IjoiZGllZ28xMGoiLCJhIjoiY2sxaWM4enF5MDJuZjNodWdndHRlYTY2eCJ9.8X6qJNGnEdGdPcibW2wc5Q';
    this.map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: this.zoom,
      interactive: this.interactive

    });

    this.marker = new mapboxgl.Marker({
      draggable: this.draggable
    })
      .setLngLat([lng, lat])
      .addTo(this.map);

    this.map.on('load', () => {
      this.map.resize();
    });

    this.marker.on('dragend', () => {
      const lngLat = this.marker.getLngLat();
      const coords = `${lngLat.lat},${lngLat.lng}`;
      this.coordenadasSeleccionada.emit(coords);
    });

  }

}
