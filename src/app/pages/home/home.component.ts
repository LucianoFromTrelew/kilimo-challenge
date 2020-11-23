import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Farm } from "src/app/models/farm";
import { FarmsService } from "src/app/services/farms.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  farms$ = this.farmsService.getFarms();

  constructor(private farmsService: FarmsService) {}

  ngOnInit(): void {}
}
