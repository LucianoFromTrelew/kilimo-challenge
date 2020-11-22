import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { MapsService } from "./services/maps.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "kilimo-challenge";
}
