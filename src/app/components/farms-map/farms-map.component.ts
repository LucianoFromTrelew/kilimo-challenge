import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Farm } from "src/app/models/farm";
import { MapsService } from "src/app/services/maps.service";

@Component({
  selector: "app-farms-map",
  templateUrl: "./farms-map.component.html",
  styleUrls: ["./farms-map.component.scss"]
})
export class FarmsMapComponent implements OnInit {
  isMapsApiLoaded: Observable<boolean>;

  constructor(private mapsService: MapsService) {
    this.isMapsApiLoaded = this.mapsService.apiLoaded;
  }

  ngOnInit(): void {
  }
}
