import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MapAnchorPoint, MapInfoWindow, MapMarker } from "@angular/google-maps";
import { Farm } from "src/app/models/farm";

@Component({
  selector: "app-farms-map",
  templateUrl: "./farms-map.component.html",
  styleUrls: ["./farms-map.component.scss"]
})
export class FarmsMapComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  @Input() farms: Farm[];

  selectedFarm: Farm | null = null;
  markerOptions = { animation: google.maps.Animation.DROP };

  constructor() {}

  ngOnInit(): void {}

  handleMarkerClick(farm: Farm, marker: MapMarker) {
    this.selectedFarm = farm;
    this.infoWindow.open(marker);
  }
}
